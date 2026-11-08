import { Direction, system } from "@minecraft/server";

// import { world } from "@minecraft/server"; // debug
// world.afterEvents.worldLoad.subscribe(() => system.runInterval(() => world.getPlayers().forEach(player => {
//     const angle = player.getRotation().y;

//     let direction;

//     if (angle >= -90 - 22.5 && angle < -90 + 22.5) direction = "east";
//     if (angle >= 180 - 22.5 || angle < -180 + 22.5) direction = "north";
//     if (angle >= -22.5 && angle < 22.5) direction = "south";
//     if (angle >= 90 - 22.5 && angle < 90 + 22.5) direction = "west";

//     if (angle >= -135 - 22.5 && angle < -135 + 22.5) direction = "northeast";
//     if (angle >= 135 - 22.5 && angle < 135 + 22.5) direction = "northwest";
//     if (angle >= -45 - 22.5 && angle < -45 + 22.5) direction = "southeast";
//     if (angle >= 45 - 22.5 && angle < 45 + 22.5) direction = "southwest";

//     player.onScreenDisplay.setActionBar(`${angle}\n${direction}`);
// })));//debug

//  135 = northeast
// -135 = northwest?
//   45 = southeast?
//  -45 = southwest?

function getOppositeDirection(direction) {
    if (direction === Direction.East) return Direction.West;
    if (direction === Direction.North) return Direction.South;
    if (direction === Direction.South) return Direction.North;
    if (direction === Direction.West) return Direction.East;
};

system.beforeEvents.startup.subscribe(event => {
    event.blockComponentRegistry.registerCustomComponent("verticality:ordinal_direction", {
        beforeOnPlayerPlace(data) {
            const { player } = data;

            const angle = player.getRotation().y;
            const face = player.getBlockFromViewDirection().face;
            const location = player.getBlockFromViewDirection().faceLocation;

            let direction = "northeast";

            if (location) {
                // if (location.x >= 0.5 && location.z < 0.5) direction = "northeast";
                if (location.x < 0.5 && location.z < 0.5) direction = "northwest";
                if (location.x >= 0.5 && location.z >= 0.5) direction = "southeast";
                if (location.x < 0.5 && location.z >= 0.5) direction = "southwest";

                if (location.x === 0 && face !== Direction.Up && face !== Direction.Down) {
                    direction = direction.replace("east", getOppositeDirection(face).toLowerCase());
                    direction = direction.replace("west", getOppositeDirection(face).toLowerCase());
                };

                if (location.z === 0 && face !== Direction.Up && face !== Direction.Down) {
                    direction = direction.replace("north", getOppositeDirection(face).toLowerCase());
                    direction = direction.replace("south", getOppositeDirection(face).toLowerCase());
                };
            } else {
                // if (angle >= -180 && angle < -90) direction = "northeast";
                if (angle >= 90 && angle < 180) direction = "northwest";
                if (angle >= -90 && angle < 0) direction = "southeast";
                if (angle >= 0 && angle < 90) direction = "southwest";
            };

            data.permutationToPlace = data.permutationToPlace.withState("verticality:ordinal_direction", direction);
        },
    });
});