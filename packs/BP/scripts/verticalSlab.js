import { Block, BlockPermutation, Direction, EntityComponentTypes, EquipmentSlot, GameMode, system, world } from "@minecraft/server";

/**
 * 
 * @param {Direction} direction 
 * @returns {string}
 */
function getOppositeDirection(direction) {
    direction = direction.toLowerCase();

    if (direction == "east") return "west";
    if (direction == "north") return "south";
    if (direction == "south") return "north";
    if (direction == "west") return "east";
};

/**
 * 
 * @param {Block} block 
 * @param {string} direction 
 */
function getBlockInDirection(block, direction) {
    direction = direction.toLowerCase();

    if (direction == "down") return block.below();
    if (direction == "east") return block.east();
    if (direction == "north") return block.north();
    if (direction == "south") return block.south();
    if (direction == "up") return block.above();
    if (direction == "west") return block.west();
};

system.beforeEvents.startup.subscribe(event => {
    event.blockComponentRegistry.registerCustomComponent("verticality:vertical_slab", {
        beforeOnPlayerPlace(data) {
            const faceLocation = data.player.getBlockFromViewDirection()?.faceLocation;

            if (!faceLocation) return;

            // world.sendMessage(`${data.face} ${faceLocation.x} ${faceLocation.y} ${faceLocation.z}`);//debug

            if (data.permutationToPlace.getState("minecraft:cardinal_direction") == "east" && faceLocation.x < 0.5 && faceLocation.x != 0)
                data.permutationToPlace = data.permutationToPlace.withState("minecraft:cardinal_direction", "west");

            if (data.permutationToPlace.getState("minecraft:cardinal_direction") == "north" && faceLocation.z > 0.5 && faceLocation.z != 0)
                data.permutationToPlace = data.permutationToPlace.withState("minecraft:cardinal_direction", "south");

            if (data.permutationToPlace.getState("minecraft:cardinal_direction") == "south" && faceLocation.z < 0.5 && faceLocation.z != 0)
                data.permutationToPlace = data.permutationToPlace.withState("minecraft:cardinal_direction", "north");

            if (data.permutationToPlace.getState("minecraft:cardinal_direction") == "west" && faceLocation.x > 0.5 && faceLocation.x != 0)
                data.permutationToPlace = data.permutationToPlace.withState("minecraft:cardinal_direction", "east");
        },
    });
});

world.beforeEvents.playerInteractWithBlock.subscribe(data => {
    const { block, blockFace, isFirstEvent, itemStack, player } = data;

    if (!itemStack) return;
    if (!itemStack.typeId.includes("verticality:") || !itemStack.typeId.includes("vertical_slab") || itemStack.typeId.includes("double")) return; // to do: figure out a better way to do this for compatibility (probably through tags)

    if (block.typeId == itemStack.typeId)
        if (blockFace && getOppositeDirection(blockFace) == block.permutation.getState("minecraft:cardinal_direction")) {
            system.run(() => {
                if (block.typeId.includes("double_")) return;
                
                if (player.getGameMode() != GameMode.Creative) {
                    let item = itemStack;

                    if (item.amount > 1) {
                        item.amount--;
                    } else {
                        item = undefined;
                    };

                    player.getComponent(EntityComponentTypes.Equippable).setEquipment(EquipmentSlot.Mainhand, item);
                };

                block.setPermutation(BlockPermutation.resolve(block.typeId.replace("verticality:", "verticality:double_")).withState("minecraft:cardinal_direction", block.permutation.getState("minecraft:cardinal_direction")));
            });

            return data.cancel = true;
        };

    const blockOn = getBlockInDirection(block, blockFace);

    // if (block.typeId == blockOn.typeId) {
    if (blockOn.typeId == itemStack.typeId) {
        system.run(() => {
            let item = itemStack;

            if (player.getGameMode() != GameMode.Creative) {
                let item = itemStack;

                if (item.amount > 1) {
                    item.amount--;
                } else {
                    item = undefined;
                };

                player.getComponent(EntityComponentTypes.Equippable).setEquipment(EquipmentSlot.Mainhand, item);
            };

            if (player.getGameMode() != GameMode.Creative) player.getComponent(EntityComponentTypes.Equippable).setEquipment(EquipmentSlot.Mainhand, item);

            blockOn.setPermutation(BlockPermutation.resolve(blockOn.typeId.replace("verticality:", "verticality:double_")).withState("minecraft:cardinal_direction", blockOn.permutation.getState("minecraft:cardinal_direction")));
        });

        return data.cancel = true;
    };
});