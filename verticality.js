const fs = require('fs');

/** FORMAT
 * blockid blocksound hardness blastresistance hexmapcolor texture? sidetexture? toptexture? bottomtexture? topewtexture? bottomewtexture?
 * NOTES
 * if no toptexture sidetexture isn't applied
 * if no bottomtexture it uses the same texture as toptexture
 * if no '...ewtexture' (which stands for east-west), they use the same as the non-ew-textures
 * >>> you don't need to worry about these unless a block's texture is named something other than it's identifier (so stop at the map color) <<<
 */

const stair = fs.readFileSync('stairsToGenerate.txt', 'utf-8').split('\r\n').filter(i => !i.startsWith('//'));
const stairIds = stair.map(s => s.split(' ')[0]);
const stairSounds = stair.map(s => s.split(' ')[1]);
const stairHardnesses = stair.map(s => s.split(' ')[2]);
const stairBlastResistances = stair.map(s => s.split(' ')[3]);
const stairMapColors = stair.map(s => s.split(' ')[4]);
const stairTextures = stair.map(s => s.split(' ')[5] ?? s.split(' ')[0]);
const stairSideTextures = stair.map(s => s.split(' ')[6]);
const stairTopTextures = stair.map(s => s.split(' ')[7]);
const stairBottomTextures = stair.map(s => s.split(' ')[8] ?? s.split(' ')[7]);

const slab = fs.readFileSync('slabsToGenerate.txt', 'utf-8').split('\r\n').filter(i => !i.startsWith('//'));
const slabIds = slab.map(s => s.split(' ')[0]);
const slabSounds = slab.map(s => s.split(' ')[1]);
const slabHardnesses = slab.map(s => s.split(' ')[2]);
const slabBlastResistances = slab.map(s => s.split(' ')[3]);
const slabMapColors = slab.map(s => s.split(' ')[4]);
const slabTextures = slab.map(s => s.split(' ')[5] ?? s.split(' ')[0]);
const slabSideTextures = slab.map(s => s.split(' ')[6]);
const slabTopTextures = slab.map(s => s.split(' ')[7]);
const slabBottomTextures = slab.map(s => s.split(' ')[8] ?? s.split(' ')[7]);
const slabTopEWTextures = slab.map(s => s.split(' ')[9] ?? s.split(' ')[7]);
const slabBottomEWTextures = slab.map(s => s.split(' ')[10] ?? s.split(' ')[8]);

const step = fs.readFileSync('stepsToGenerate.txt', 'utf-8').split('\r\n').filter(i => !i.startsWith('//'));
const stepIds = step.map(s => s.split(' ')[0]);
const stepSounds = step.map(s => s.split(' ')[1]);
const stepHardnesses = step.map(s => s.split(' ')[2]);
const stepBlastResistances = step.map(s => s.split(' ')[3]);
const stepMapColors = step.map(s => s.split(' ')[4]);
const stepTextures = step.map(s => s.split(' ')[5] ?? s.split(' ')[0]);
const stepSideTextures = step.map(s => s.split(' ')[6]);
const stepTopTextures = step.map(s => s.split(' ')[7]);
const stepBottomTextures = step.map(s => s.split(' ')[8] ?? s.split(' ')[7]);
const stepTopEWTextures = step.map(s => s.split(' ')[9] ?? s.split(' ')[7]);
const stepBottomEWTextures = step.map(s => s.split(' ')[10] ?? s.split(' ')[8]);

const verticalStep = fs.readFileSync('verticalStepsToGenerate.txt', 'utf-8').split('\r\n').filter(i => !i.startsWith('//'));
const verticalStepIds = verticalStep.map(s => s.split(' ')[0]);
const verticalStepSounds = verticalStep.map(s => s.split(' ')[1]);
const verticalStepHardnesses = verticalStep.map(s => s.split(' ')[2]);
const verticalStepBlastResistances = verticalStep.map(s => s.split(' ')[3]);
const verticalStepMapColors = verticalStep.map(s => s.split(' ')[4]);
const verticalStepTextures = verticalStep.map(s => s.split(' ')[5] ?? s.split(' ')[0]);
const verticalStepSideTextures = verticalStep.map(s => s.split(' ')[6]);
const verticalStepTopTextures = verticalStep.map(s => s.split(' ')[7]);
const verticalStepBottomTextures = verticalStep.map(s => s.split(' ')[8] ?? s.split(' ')[7]);

fs.writeFileSync('packs/BP/item_catalog/crafting_item_catalog.json', fs.readFileSync('templates/crafting_item_catalog.json', 'utf-8').replace('stairidentifier', stairIds.map(i => `"verticality:${i}_vertical_stairs"`).join(',')).replace('slabidentifier', slabIds.map(i => `"verticality:${i}_vertical_slab"`).join(',')).replace('stepidentifier', stepIds.map(i => `"verticality:${i}_step"`).join(',')).replace('verticalstepidentifier', stepIds.map(i => `"verticality:${i}_vertical_step"`).join(',')));

const en_US_stair = stairIds.map(id => `tile.verticality:${id}_vertical_stairs.name=${id.split('_').map(i => i.slice(-i.length, 1).toUpperCase() + i.slice(1)).join(' ')} Vertical Stairs`).join('\n');
const en_US_slab = slabIds.map(id => `tile.verticality:${id}_vertical_slab.name=${id.split('_').map(i => i.slice(-i.length, 1).toUpperCase() + i.slice(1)).join(' ')} Vertical Slab`).join('\n');
const en_US_double_slab = slabIds.map(id => `tile.verticality:double_${id}_vertical_slab.name=${id.split('_').map(i => i.slice(-i.length, 1).toUpperCase() + i.slice(1)).join(' ')} Double Vertical Slab`).join('\n');
const en_US_step = stepIds.map(id => `tile.verticality:${id}_step.name=${id.split('_').map(i => i.slice(-i.length, 1).toUpperCase() + i.slice(1)).join(' ')} Step`).join('\n');
const en_US_vertical_step = stepIds.map(id => `tile.verticality:${id}_vertical_step.name=${id.split('_').map(i => i.slice(-i.length, 1).toUpperCase() + i.slice(1)).join(' ')} Vertical Step`).join('\n');
fs.writeFileSync('packs/RP/texts/en_US.lang', ['verticality:itemGroup.name.verticalStair=Vertical Stairs', en_US_stair, 'verticality:itemGroup.name.verticalSlab=Vertical Slabs', en_US_slab, en_US_double_slab, 'verticality:itemGroup.name.step=Steps', en_US_step, 'verticality:itemGroup.name.verticalStep=Vertical Steps', en_US_vertical_step].join('\n'));

// VERTICAL STAIRS
for (let i = 0; i < stairIds.length; i++) {
    const id = stairIds[i];
    const sound = stairSounds[i];
    let hardness = parseFloat(stairHardnesses[i]);
    const blastResistance = stairBlastResistances[i];
    const mapColor = stairMapColors[i];
    const texture = stairTextures[i];
    const sideTexture = stairSideTextures[i];
    const topTexture = stairTopTextures[i];
    const bottomTexture = stairBottomTextures[i];

    let hardnessMultiplier = 5 * 2/3;
    if (
        ['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)
     || id.includes('wool')
    ) hardnessMultiplier = 1;
    hardness *= hardnessMultiplier;
    hardness = hardness.toFixed(2);

    let tool = 'pickaxe';
    if (['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)) tool = 'axe';
    if (id.includes('wool')) tool = 'shears';

    const toolLoot = tool !== 'pickaxe' ? '' : `"conditions":[{"condition":"match_tool","minecraft:match_tool_filter_all": ["minecraft:is_${tool}"]}],`;

    if (tool === 'pickaxe' || tool === 'axe') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:wooden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 2).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:stone_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 4).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:copper_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 5).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:iron_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 6).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:diamond_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 8).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:netherite_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 9).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:golden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 12).toFixed(2)}}]`
    ].join(',');
    if (tool === 'shears') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_shears')"},"destroy_speed":${(hardness / hardnessMultiplier / (id.includes('wool') ? 5 : 2)).toFixed(2)}}]`
    ].join(',');

    // BP DEFINITIONS
    if (sideTexture && topTexture) {
        fs.writeFileSync(`packs/BP/blocks/verticality/vertical_stairs/${id}.json`, fs.readFileSync('templates/bp/vertical_stair_texture.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('stairsound', sound).replaceAll('stairmining', hardness).replaceAll('stairexplosion', blastResistance * 5).replaceAll('staircolor', mapColor).replaceAll('stairtexture', texture).replaceAll('sidetexture', sideTexture).replaceAll('toptexture', topTexture).replaceAll('bottomtexture', bottomTexture ?? topTexture).replaceAll('stairtool', tool));
    } else {
        fs.writeFileSync(`packs/BP/blocks/verticality/vertical_stairs/${id}.json`, fs.readFileSync('templates/bp/vertical_stair.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('stairsound', sound).replaceAll('stairmining', hardness).replaceAll('stairexplosion', blastResistance * 5).replaceAll('staircolor', mapColor).replaceAll('stairtexture', texture).replaceAll('stairtool', tool));
    };

    // LOOT TABLES
    fs.writeFileSync(`packs/BP/loot_tables/blocks/verticality/vst/${id}.json`, fs.readFileSync('templates/loot_table/vertical_stairs.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('stairtool', toolLoot));

    // RECIPES
    fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_stairs/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_stairs.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', id));
    fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/stairs_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/stairs_from_vertical.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', id));

    if (id == 'stone') {
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_stairs/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_stairs.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'normal_stone'));
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/stairs_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/stairs_from_vertical.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'normal_stone'));
    };

    if (id == 'cobblestone') {
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_stairs/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_stairs.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'stone'));
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/stairs_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/stairs_from_vertical.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'stone'));
    };

    if (id == 'end_stone_brick') {
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_stairs/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_stairs.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'end_brick'));
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/stairs_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/stairs_from_vertical.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'end_brick'));
    };

    if (id == 'end_stone_brick') {
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_stairs/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_stairs.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'end_brick'));
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/stairs_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/stairs_from_vertical.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'end_brick'));
    };

    if (id == 'prismarine_brick') {
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_stairs/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_stairs.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'prismarine_bricks'));
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/stairs_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/stairs_from_vertical.json', 'utf-8').replaceAll('stairidentifier', id).replaceAll('vanillaidentifier', 'prismarine_bricks'));
    };
};

// VERTICAL SLAB
for (let i = 0; i < slabIds.length; i++) {
    const id = slabIds[i];
    const sound = slabSounds[i];
    let hardness = parseFloat(slabHardnesses[i]);
    const blastResistance = slabBlastResistances[i];
    const mapColor = slabMapColors[i];
    const texture = slabTextures[i];
    const sideTexture = slabSideTextures[i];
    const topTexture = slabTopTextures[i];
    const bottomTexture = slabBottomTextures[i];
    const topEWTexture = slabTopEWTextures[i];
    const bottomEWTexture = slabBottomEWTextures[i];

    let hardnessMultiplier = 5 * 2/3;
    if (
        ['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)
     || id.includes('wool')
    ) hardnessMultiplier = 1;
    hardness *= hardnessMultiplier;
    hardness = hardness.toFixed(2);

    let tool = 'pickaxe';
    if (['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)) tool = 'axe';
    if (id.includes('wool')) tool = 'shears';

    const toolLoot = tool !== 'pickaxe' ? '' : `"conditions":[{"condition":"match_tool","minecraft:match_tool_filter_all": ["minecraft:is_${tool}"]}],`;

    if (tool === 'pickaxe' || tool === 'axe') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:wooden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 2).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:stone_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 4).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:copper_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 5).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:iron_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 6).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:diamond_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 8).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:netherite_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 9).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:golden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 12).toFixed(2)}}]`
    ].join(',');
    if (tool === 'shears') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_shears')"},"destroy_speed":${(hardness / hardnessMultiplier / (id.includes('wool') ? 5 : 2)).toFixed(2)}}]`
    ].join(',');

    // BP DEFINITIONS
    if (sideTexture && topTexture) {
        fs.writeFileSync(`packs/BP/blocks/verticality/vertical_slabs/${id}.json`, fs.readFileSync('templates/bp/vertical_slab_texture.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('slabsound', sound).replaceAll('slabmining', hardness).replaceAll('slabexplosion', blastResistance * 5).replaceAll('slabcolor', mapColor).replaceAll('slabtexture', texture).replaceAll('sidetexture', sideTexture).replaceAll('toptexture', topTexture).replaceAll('bottomtexture', bottomTexture ?? topTexture).replaceAll('topewtexture', topEWTexture).replaceAll('bottomewtexture', bottomEWTexture ?? topEWTexture).replaceAll('slabtool', tool));
        fs.writeFileSync(`packs/BP/blocks/verticality/double_vertical_slabs/${id}.json`, fs.readFileSync('templates/bp/double_vertical_slab_texture.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('slabsound', sound).replaceAll('slabmining', hardness).replaceAll('slabexplosion', blastResistance * 5).replaceAll('slabcolor', mapColor).replaceAll('slabtexture', texture).replaceAll('sidetexture', sideTexture).replaceAll('toptexture', topTexture).replaceAll('bottomtexture', bottomTexture ?? topTexture).replaceAll('topewtexture', topEWTexture).replaceAll('bottomewtexture', bottomEWTexture ?? topEWTexture).replaceAll('slabtool', tool));
    } else {
        fs.writeFileSync(`packs/BP/blocks/verticality/vertical_slabs/${id}.json`, fs.readFileSync('templates/bp/vertical_slab.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('slabsound', sound).replaceAll('slabmining', hardness).replaceAll('slabexplosion', blastResistance * 5).replaceAll('slabcolor', mapColor).replaceAll('slabtexture', texture).replaceAll('slabtool', tool));
        fs.writeFileSync(`packs/BP/blocks/verticality/double_vertical_slabs/${id}.json`, fs.readFileSync('templates/bp/double_vertical_slab.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('slabsound', sound).replaceAll('slabmining', hardness).replaceAll('slabexplosion', blastResistance * 5).replaceAll('slabcolor', mapColor).replaceAll('slabtexture', texture).replaceAll('slabtool', tool));
    };

    // LOOT TABLES
    fs.writeFileSync(`packs/BP/loot_tables/blocks/verticality/vsl/${id}.json`, fs.readFileSync('templates/loot_table/vertical_slab.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('slabtool', toolLoot));
    fs.writeFileSync(`packs/BP/loot_tables/blocks/verticality/dvs/${id}.json`, fs.readFileSync('templates/loot_table/double_vertical_slab.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('slabtool', toolLoot));

    // RECIPES
    fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_slab/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_slab.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('vanillaidentifier', id));
    fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/slab_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/slab_from_vertical.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('vanillaidentifier', id));

    if (id == 'stone') {
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_slab/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_slab.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('vanillaidentifier', 'normal_stone'));
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/slab_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/slab_from_vertical.json', 'utf-8').replaceAll('slabidentifier', id).replaceAll('vanillaidentifier', 'normal_stone'));
    };
};

// STEP
for (let i = 0; i < stepIds.length; i++) {
    const id = stepIds[i];
    const sound = stepSounds[i];
    let hardness = parseFloat(stepHardnesses[i]);
    const blastResistance = stepBlastResistances[i];
    const mapColor = stepMapColors[i];
    const texture = stepTextures[i];
    const sideTexture = stepSideTextures[i];
    const topTexture = stepTopTextures[i];
    const bottomTexture = stepBottomTextures[i];
    const topEWTexture = stepTopEWTextures[i];
    const bottomEWTexture = stepBottomEWTextures[i];

    let hardnessMultiplier = 5 * 2/3;
    if (
        ['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)
     || id.includes('wool')
    ) hardnessMultiplier = 1;
    hardness *= hardnessMultiplier;
    hardness = hardness.toFixed(2);

    let tool = 'pickaxe';
    if (['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)) tool = 'axe';
    if (id.includes('wool')) tool = 'shears';

    const toolLoot = tool !== 'pickaxe' ? '' : `"conditions":[{"condition":"match_tool","minecraft:match_tool_filter_all": ["minecraft:is_${tool}"]}],`;

    if (tool === 'pickaxe' || tool === 'axe') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:wooden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 2).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:stone_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 4).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:copper_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 5).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:iron_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 6).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:diamond_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 8).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:netherite_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 9).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:golden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 12).toFixed(2)}}]`
    ].join(',');
    if (tool === 'shears') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_shears')"},"destroy_speed":${(hardness / hardnessMultiplier / (id.includes('wool') ? 5 : 2)).toFixed(2)}}]`
    ].join(',');

    // BP DEFINITIONS
    if (sideTexture && topTexture) {
        fs.writeFileSync(`packs/BP/blocks/verticality/steps/${id}.json`, fs.readFileSync('templates/bp/step_texture.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('stepsound', sound).replaceAll('stepmining', hardness).replaceAll('stepexplosion', blastResistance * 5).replaceAll('stepcolor', mapColor).replaceAll('steptexture', texture).replaceAll('sidetexture', sideTexture).replaceAll('toptexture', topTexture).replaceAll('bottomtexture', bottomTexture ?? topTexture).replaceAll('topewtexture', topEWTexture).replaceAll('bottomewtexture', bottomEWTexture ?? topEWTexture).replaceAll('steptool', tool));
    } else {
        fs.writeFileSync(`packs/BP/blocks/verticality/steps/${id}.json`, fs.readFileSync('templates/bp/step.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('stepsound', sound).replaceAll('stepmining', hardness).replaceAll('stepexplosion', blastResistance * 5).replaceAll('stepcolor', mapColor).replaceAll('steptexture', texture).replaceAll('steptool', tool));
    };

    // LOOT TABLES
    fs.writeFileSync(`packs/BP/loot_tables/blocks/verticality/stp/${id}.json`, fs.readFileSync('templates/loot_table/step.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('steptool', toolLoot));

    // RECIPES
    fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/step/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/step.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('vanillaidentifier', id));

    if (id == 'stone') {
        fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/step/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/step.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('vanillaidentifier', 'normal_stone'));
    };
};

// VERTICAL STEP
for (let i = 0; i < verticalStepIds.length; i++) {
    const id = verticalStepIds[i];
    const sound = verticalStepSounds[i];
    let hardness = parseFloat(verticalStepHardnesses[i]);
    const blastResistance = verticalStepBlastResistances[i];
    const mapColor = verticalStepMapColors[i];
    const texture = verticalStepTextures[i];
    const sideTexture = verticalStepSideTextures[i];
    const topTexture = verticalStepTopTextures[i];
    const bottomTexture = verticalStepBottomTextures[i];

    let hardnessMultiplier = 5 * 2/3;
    if (
        ['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)
     || id.includes('wool')
    ) hardnessMultiplier = 1;
    hardness *= hardnessMultiplier;
    hardness = hardness.toFixed(2);

    let tool = 'pickaxe';
    if (['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','poplar','cherry','pale_oak','bamboo','bamboo_mosaic','crimson','warped'].includes(id)) tool = 'axe';
    if (id.includes('wool')) tool = 'shears';

    const toolLoot = tool !== 'pickaxe' ? '' : `"conditions":[{"condition":"match_tool","minecraft:match_tool_filter_all": ["minecraft:is_${tool}"]}],`;

    if (tool === 'pickaxe' || tool === 'axe') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:wooden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 2).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:stone_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 4).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:copper_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 5).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:iron_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 6).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:diamond_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 8).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:netherite_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 9).toFixed(2)}}`,
        `{"item":{"tags":"q.all_tags('minecraft:is_${tool}','minecraft:golden_tier')"},"destroy_speed":${(hardness / hardnessMultiplier / 12).toFixed(2)}}]`
    ].join(',');
    if (tool === 'shears') hardness = [
        `${hardness}`,
        `"item_specific_speeds":[{"item":{"tags":"q.all_tags('minecraft:is_shears')"},"destroy_speed":${(hardness / hardnessMultiplier / (id.includes('wool') ? 5 : 2)).toFixed(2)}}]`
    ].join(',');

    // BP DEFINITIONS
    if (sideTexture && topTexture) {
        fs.writeFileSync(`packs/BP/blocks/verticality/vertical_steps/${id}.json`, fs.readFileSync('templates/bp/vertical_step_texture.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('stepsound', sound).replaceAll('stepmining', hardness).replaceAll('stepexplosion', blastResistance * 5).replaceAll('stepcolor', mapColor).replaceAll('steptexture', texture).replaceAll('sidetexture', sideTexture).replaceAll('toptexture', topTexture).replaceAll('bottomtexture', bottomTexture ?? topTexture).replaceAll('steptool', tool));
    } else {
        fs.writeFileSync(`packs/BP/blocks/verticality/vertical_steps/${id}.json`, fs.readFileSync('templates/bp/vertical_step.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('stepsound', sound).replaceAll('stepmining', hardness).replaceAll('stepexplosion', blastResistance * 5).replaceAll('stepcolor', mapColor).replaceAll('steptexture', texture).replaceAll('steptool', tool));
    };

    // LOOT TABLES
    fs.writeFileSync(`packs/BP/loot_tables/blocks/verticality/vsp/${id}.json`, fs.readFileSync('templates/loot_table/vertical_step.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('steptool', toolLoot));

    // RECIPES
    fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/vertical_from_step/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/vertical_from_step.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('vanillaidentifier', id));
    fs.writeFileSync(`packs/BP/recipes/verticality/crafting_table/step_from_vertical/${id}.json`, fs.readFileSync('templates/recipe/crafting_table/step_from_vertical.json', 'utf-8').replaceAll('stepidentifier', id).replaceAll('vanillaidentifier', id));
};