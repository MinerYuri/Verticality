import { EntityComponentTypes, EquipmentSlot, ItemStack, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(event => {
    event.blockComponentRegistry.registerCustomComponent("verticality:extra_loot", {
        onPlayerBreak(data, component) {
            const { block, dimension, player } = data;
            const { tool, amount } = component.params;

            const itemStack = player.getComponent(EntityComponentTypes.Equippable).getEquipment(EquipmentSlot.Mainhand);

            if (itemStack.hasTag(`minecraft:is_${tool}`)) dimension.spawnItem(new ItemStack(block.typeId.split('double_').join(''), amount), block.center());
        },
    });
});