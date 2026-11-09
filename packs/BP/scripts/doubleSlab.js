import { EntityComponentTypes, EquipmentSlot, GameMode, ItemStack, Player, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(event => {
    event.blockComponentRegistry.registerCustomComponent("verticality:double_slab", {
        onBreak(data) {
            const { block, brokenBlockPermutation, dimension, entitySource } = data;
            
            if (entitySource && entitySource instanceof Player && entitySource.getGameMode() === GameMode.Creative) return;

            let drop = false;

            let tool = 'pickaxe';
            if (
                ['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(brokenBlockPermutation.type.id.split(':')[1].split('_')[1])
             || brokenBlockPermutation.type.id.includes('wool')
            ) drop = true;

            if (entitySource instanceof Player) {
                const itemStack = entitySource.getComponent(EntityComponentTypes.Equippable).getEquipment(EquipmentSlot.Mainhand);

                if (itemStack && itemStack.hasTag(`minecraft:is_${tool}`)) drop = true;
            };

            if (drop) dimension.spawnItem(new ItemStack(brokenBlockPermutation.type.id.split('double_').join(''), 2), block.center());
        },
    });
});