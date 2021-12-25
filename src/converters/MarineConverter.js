export function marineToXml(marine) {
    return '<spacemarine>' +
        (marine.id === null? '' : '<id>' + marine.id + '</id>') +
        '         <name>' + marine.name + '</name>' +
        (marine.health === null? '' : '         <health>' + marine.health + '</health>') +
        (marine.category === null? '' : '         <category>' + marine.category + '</category>') +
        (marine.weaponType === null? '' : '         <weaponType>' + marine.weaponType + '</weaponType>') +
        (marine.meleeWeapon === null? '' : '         <meleeWeapon>' + marine.meleeWeapon + '</meleeWeapon>') +
        '         <coordinates>' +
        '            <x>' + marine.coordinates.x + '</x>' +
        '            <y>' + marine.coordinates.y + '</y>' +
        '         </coordinates>' +
        (marine.chapter == null? '':
        '         <chapter>' +
        (marine.chapter.id === null? '' : '            <id>' + marine.chapter.id + '</id>') +
        (marine.chapter.name === null? '' : '            <name>' + marine.chapter.name + '</name>') +
        (marine.chapter.parentLegion === null? '' : '            <parentLegion>' + marine.chapter.parentLegion + '</parentLegion>') +
        (marine.chapter.marinesCount === null? '': '            <marinesCount>' + marine.chapter.marinesCount + '</marinesCount>') +
        (marine.chapter.world === null? '' : '            <world>' + marine.chapter.world + '</world>') +
        '         </chapter>'
       ) +  '      </spacemarine>'
}