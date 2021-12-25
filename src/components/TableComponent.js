import React, {useEffect} from "react";
import {
    Button,
    Checkbox,
    DeleteIcon,
    Dialog,
    EditIcon,
    IconButton,
    Pane,
    Paragraph,
    SelectField,
    Table,
    TableCell,
    TextInput,
    TextInputField,
    toaster,
    Tooltip
} from "evergreen-ui";
import {XMLParser} from 'fast-xml-parser';
import {deleteMarine, getAll, getAllBySubstring, getAllBySuperiorGroup, getById} from "../api/Api";
import CreatePage from "../pages/CreatePage";
import {editMarine} from "../objects/DefaultMarine";


export default function TableComponent() {

    const [spaceMarines, setSpaceMarines] = React.useState([])
    const [shouldUpdate, setShouldUpdate] = React.useState(false)

    const [isFilterSelected, setIsFilterSelected] = React.useState(false)
    const [isSortSelected, setIsSortSelected] = React.useState(false)

    const [substr, setSubst] = React.useState('')
    const [supGroup, setSupGroup] = React.useState('HEAVY_BOLTGUN')
    const [filter, setFilter] = React.useState(new Map())
    const [messages, setMessages] = React.useState([])
    const [pagination, setPagination] = React.useState(new Map())
    const [sort, setSort] = React.useState(new Map([["sortOrder", "ASC"], ["sortType", "ID"]]))

    useEffect(() => {
        try {
            getAll(getFilterStr(), getSortStr(), getPaginationStr())
                .then(response => {
                    const parser = new XMLParser();
                    let obj = parser.parse(response.data);

                    console.log("RESULT: " + JSON.stringify(obj))

                    if (obj.marines.marines.spaceMarine.name != undefined) {
                        setSpaceMarines([obj.marines.marines.spaceMarine])
                    } else {
                        setSpaceMarines(obj.marines.marines.spaceMarine)
                    }
                    setMessages([])
                }).catch(error => {
                    setSpaceMarines([])
                    if (error.response) {
                        const parser = new XMLParser();
                        let obj = parser.parse(error.response.data);

                        if (!Array.isArray(obj.messages.messages.message)) {
                            setMessages([obj.messages.messages.message])
                        } else {
                            setMessages(obj.messages.messages.message)
                        }
                    }
                });
        } catch (ex) {
            alert(ex)
        }


        console.log(spaceMarines)

    }, [shouldUpdate])

    function nameFilter() {
        return <td colSpan={2}>
            <TextInputField
                isInvalid={false}
                label="Name*"
                onChange={e => filter.set("name", e.target.value)}
                description="Введите имя или часть имени"
                textAlign={"start"}
            />
        </td>
    }

    function minMaxId() {
        return <>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Min Id*"
                    description="Введите минимальный id"
                    onChange={e => filter.set("minId", e.target.value)}
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max Id*"
                    description="Введите максимальный Id"
                    onChange={e => filter.set("maxId", e.target.value)}
                    textAlign={"start"}
                />
            </td>
        </>
    }

    function minMaxX() {
        return <>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Min X*"
                    description="Введите минимальный Х"
                    onChange={e => filter.set("minX", e.target.value)}
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max X*"
                    description="Введите максимальный Х"
                    onChange={e => filter.set("maxX", e.target.value)}
                    textAlign={"start"}
                />
            </td>
        </>
    }

    function minMaxY() {
        return <>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Min Y*"
                    description="Введите минимальный Y"
                    onChange={e => filter.set("minY", e.target.value)}
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max Y*"
                    description="Введите максимальный Y"
                    onChange={e => filter.set("maxY", e.target.value)}
                    textAlign={"start"}
                />
            </td>
        </>
    }

    function minMaxHealth() {
        return <>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Min-Health*"
                    description="Введите минимальное здоровье"
                    onChange={e => filter.set("minHealth", e.target.value)}
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max-Health*"
                    description="Введите максимальное здоровье"
                    onChange={e => filter.set("maxHealth", e.target.value)}
                    textAlign={"start"}
                />
            </td>
        </>

    }

    function chapterParentLegion() {
        return <td colSpan={2}>
            <TextInputField
                isInvalid={false}
                label="Chapter parent legion*"
                onChange={e => filter.set("chapterParLeg", e.target.value)}
                description="Введите родительский легион"
                textAlign={"start"}
            />
        </td>
    }

    function chapterWorld() {
        return <td colSpan={2}>
            <TextInputField
                isInvalid={false}
                label="Chapter world*"
                onChange={e => filter.set("chapterWorld", e.target.value)}
                description="Введите мир главаря"
                textAlign={"start"}
            />
        </td>
    }

    function chapterName() {
        return <td colSpan={2}>
            <TextInputField
                isInvalid={false}
                label="Chapter parent legion*"
                onChange={e => filter.set("chapterName", e.target.value)}
                description="Введите имя главаря"
                textAlign={"start"}
            />
        </td>
    }

    function minMaxChapterId() {
        return <>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Min chapter id*"
                    description="Введите минимальный chapter id"
                    onChange={e => filter.set("chapterMinId", e.target.value)}
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max chapter id*"
                    description="Введите максимальный chapter id"
                    onChange={e => filter.set("chapterMaxId", e.target.value)}
                    textAlign={"start"}
                />
            </td>
        </>
    }

    function minMaxMarines() {
        return <>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Min marines count*"
                    onChange={e => filter.set("chapterMinMarCount", e.target.value)}
                    description="Введите минимальный кол-во пехотинцев"
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max marines count*"
                    onChange={e => filter.set("chapterMaxMarCount", e.target.value)}
                    description="Введите максимальный кол-во пехотинцев"
                    textAlign={"start"}
                />
            </td>
        </>
    }

    function weaponSelect() {
        return <SelectField
            textAlign={"start"}
            onChange={e => filter.set("weapon", e.target.value)}
            label="Weapon"
        >
            <option value="NONE" selected>
                NONE
            </option>
            <option value="HEAVY_BOLTGUN">
                HEAVY_BOLTGUN
            </option>
            <option value="MELTAGUN">
                MELTAGUN
            </option>
            <option value="COMBI_FLAMER">
                COMBI_FLAMER
            </option>
            <option value="PLASMA_GUN">
                PLASMA_GUN
            </option>
            <option value="GRAV_GUN">
                GRAV_GUN
            </option>
        </SelectField>
    }

    function categorySelect() {
        return <SelectField
            textAlign={"start"}
            onChange={e => filter.set("category", e.target.value)}
            label="Category"
        >
            <option value="NONE" selected>
                NONE
            </option>
            <option value="SCOUT">SCOUT</option>
            <option value="DREADNOUGHT">DREADNOUGHT</option>
            <option value="AGGRESSOR">AGGRESSOR</option>
            <option value="ASSAULT">ASSAULT</option>
            <option value="HELIX">HELIX</option>
        </SelectField>
    }

    function meleeWeaponSelect() {
        return <SelectField
            textAlign={"start"}
            onChange={e => {
                filter.set("meleeWeapon", e.target.value)
            }}
            label="Melee weapon"
        >
            <option value="NONE" selected>
                NONE
            </option>
            <option value="POWER_SWORD">
                POWER_SWORD
            </option>
            <option value="MANREAPER">
                MANREAPER
            </option>
            <option value="LIGHTING_CLAW">
                LIGHTING_CLAW
            </option>
        </SelectField>
    }

    function onDeleteAction(id, index) {
        deleteMarine(id).then( (res) => {
            toaster.success('Пехотинец был успешно ликвидирован!' + index)
            spaceMarines.splice(index, 1)
            setShouldUpdate(!shouldUpdate)
        }).catch(
            err => {
                toaster.danger("Пехотинец не найден! Возможно он уже был удалён!")
                setShouldUpdate(!shouldUpdate)
            }
        )
    }

    function getFilterStr() {
        let filterStr = ''
        if (isFilterSelected) {
            filter.forEach((value, key) => {
                    if (value != '') {
                        filterStr += key + "=" + value + "&"
                    }
                }
            )
        }

        return filterStr
    }

    function getSortStr() {
        let sortStr = ''
        if (isSortSelected) {
            sort.forEach((value, key) =>
                sortStr += key + "=" + value + "&")
        }

        return sortStr
    }

    function getPaginationStr() {
        let paginationStr = ''

        pagination.forEach((value, key) =>
            paginationStr += key + "=" + value + "&")


        return paginationStr
    }

    function onChangeMarineAction(id) {
        getById(id).then((res) => {
            const parser = new XMLParser();
            let obj = parser.parse(res.data);

            editMarine.id = obj.spaceMarine.id
            editMarine.name = obj.spaceMarine.name
            editMarine.health = obj.spaceMarine.health
            editMarine.category = obj.spaceMarine.category
            editMarine.weaponType = obj.spaceMarine.weaponType
            editMarine.meleeWeapon =  obj.spaceMarine.meleeWeapon
            editMarine.coordinates.x = obj.spaceMarine.coordinates.x
            editMarine.coordinates.y = obj.spaceMarine.coordinates.y

            console.log(editMarine.chapter)

            if (obj.spaceMarine.chapter != undefined) {
                editMarine.chapter.id = obj.spaceMarine.chapter.id
                editMarine.chapter.name = obj.spaceMarine.chapter.name
                editMarine.chapter.parentLegion = obj.spaceMarine.chapter.parentLegion
                editMarine.chapter.world = obj.spaceMarine.chapter.world
                editMarine.chapter.marinesCount = obj.spaceMarine.chapter.marinesCount
            }


            console.log(editMarine)

            setChangeComponent(<CreatePage marineToChange={editMarine} isEdit={true}/>)
            setIsShown(true)
        }).catch(res => {
            toaster.danger("Пехотинец не найден! Возможно он был удалён")
            setShouldUpdate(!shouldUpdate)
        })

    }

    function onSubstrActionClick() {
        getAllBySubstring(substr).then(response => {
            const parser = new XMLParser();
            let obj = parser.parse(response.data);

            console.log("RESULT: " + JSON.stringify(obj))

            if (obj.marines.marines.spaceMarine.name != undefined) {
                setSpaceMarines([obj.marines.marines.spaceMarine])
            } else {
                setSpaceMarines(obj.marines.marines.spaceMarine)
            }
            setMessages([])
        }).catch(error => {
            setSpaceMarines([])
            if (error.response) {
                const parser = new XMLParser();
                let obj = parser.parse(error.response.data);

                if (!Array.isArray(obj.messages.messages.message)) {
                    setMessages([obj.messages.messages.message])
                } else {
                    setMessages(obj.messages.messages.message)
                }
            }
        });
    }

    function onSuperiorGroupActionClick() {
        getAllBySuperiorGroup(supGroup).then(response => {
            const parser = new XMLParser();
            let obj = parser.parse(response.data);

            console.log("RESULT: " + JSON.stringify(obj))

            if (obj.marines.marines.spaceMarine.name != undefined) {
                setSpaceMarines([obj.marines.marines.spaceMarine])
            } else {
                setSpaceMarines(obj.marines.marines.spaceMarine)
            }
            setMessages([])
        }).catch(error => {
            setSpaceMarines([])
            if (error.response) {
                const parser = new XMLParser();
                let obj = parser.parse(error.response.data);

                if (!Array.isArray(obj.messages.messages.message)) {
                    setMessages([obj.messages.messages.message])
                } else {
                    setMessages(obj.messages.messages.message)
                }
            }
        });
    }

    function onApplyAction() {
        setShouldUpdate(!shouldUpdate)
    }

    const [isShown, setIsShown] = React.useState(false)
    const [marineToChange, setMarineToChange] = React.useState(editMarine)
    const [changeComponent, setChangeComponent] = React.useState(<CreatePage marineToChange={editMarine} isEdit={true}/>)

    return (
        <Pane>
            <Pane>
                <Dialog
                    width={1400}
                    isShown={isShown}
                    title="Форма изменения пехотинца"
                    onConfirm={() => {
                        setShouldUpdate(!shouldUpdate)
                        setIsShown(false)
                    }}
                    onCloseComplete={() => {
                        setIsShown(false)
                        setShouldUpdate(!shouldUpdate)
                    }}
                    hasCancel={false}
                    confirmLabel="Отменить"
                >
                    {changeComponent}
                </Dialog>
            </Pane>
            <Pane margin={50} >
                <Checkbox checked={isFilterSelected} onChange={e => setIsFilterSelected(e.target.checked)} label={"Фильтр"}/>
                <Pane display={isFilterSelected ? "flex" : "none"} >
                    <Pane>
                        <table>
                            {/* ФИЛЬТР */}
                            <tr><th colSpan={2}>SPACEMARINE</th></tr>
                            <tr>{minMaxId()}</tr>
                            <tr>{nameFilter()}</tr>
                            <tr>{minMaxX()}</tr>
                            <tr>{minMaxY()}</tr>
                            <tr>{minMaxHealth()}</tr>
                            <tr><td colSpan={2}>{weaponSelect()}</td></tr>
                            <tr><td colSpan={2}>{meleeWeaponSelect()}</td></tr>
                            <tr><td colSpan={2}>{categorySelect()}</td></tr>
                        </table>
                    </Pane>

                    <Pane marginLeft={60}>
                        <table>
                            <tr><th colSpan={2}>SPACEMARINE's CHAPTER</th></tr>
                            <tr>{chapterName()}</tr>
                            <tr>{chapterParentLegion()}</tr>
                            <tr>{chapterWorld()}</tr>
                            <tr>{minMaxChapterId()}</tr>
                            <tr>{minMaxMarines()}</tr>
                        </table>
                    </Pane>
                </Pane>

                <Checkbox checked={isSortSelected} onChange={e => setIsSortSelected(e.target.checked)} label={"Сортировка"}/>
                <Pane display={isSortSelected ? "block" : "none"}>
                    <SelectField
                        textAlign={"start"}
                        onChange={e => sort.set("sortType", e.target.value)}
                        label="Сортировать по"
                    >
                        <option value="ID" selected>id</option>
                        <option value="NAME">name</option>
                        <option value="X">x</option>
                        <option value="Y">y</option>
                        <option value="HEALTH">health</option>
                        <option value="CHAPTER_ID">chapter's id</option>
                        <option value="CHAPTER_NAME">chapter's name</option>
                        <option value="CHAPTER_PARENT_LEGION">chapter's parent legion</option>
                        <option value="CHAPTER_MARINES_COUNT">chapter's marines count</option>
                        <option value="CHAPTER_WORLD">chapter's world</option>
                        <option value="CATEGORY">category</option>
                        <option value="WEAPON_TYPE">weapon type</option>
                        <option value="MELEE_WEAPON">melee weapon</option>
                    </SelectField>
                    <SelectField
                        textAlign={"start"}
                        onChange={e => sort.set("sortOrder", e.target.value)}
                        label="Порядок сортировка"
                    >
                        <option value="ASC" selected>
                            ASC
                        </option>
                        <option value="DESC">DESC</option>
                    </SelectField>
                </Pane>
            </Pane>
            <Pane marginLeft={40} display={"flex"} alignItems={"start"} textAlign={"start"}>
                <TextInput
                    isInvalid={false}
                    placeholder="Введите размер страницы"
                    onChange={e => pagination.set("pageSize", e.target.value)}
                    textAlign={"start"}
                />
                <TextInput
                    isInvalid={false}
                    onChange={e => pagination.set("pageNum", e.target.value)}
                    placeholder="Введите номер страницы"
                    textAlign={"start"}
                />
                <Button onClick={() => onApplyAction()}>Применить</Button>
            </Pane>

            <Pane>
                {messages.map(m => <Paragraph color={"red"} marginTop={10} marginLeft={40} textAlign={"left"}>{m}</Paragraph>)}
            </Pane>

            <Pane>
                <Pane display={"flex"} marginBottom={20} marginTop={20}>
                    <Paragraph marginLeft={40} textAlign={"left"}><b>Вернуть массив объектов, значение поля name которых содержит заданную подстроку</b></Paragraph>
                    <TextInput
                        marginLeft={30}
                        onChange={(e) => setSubst(e.target.value)}
                        value={substr}
                        placeholder={"Подстрока"}
                    />
                    <Button
                        marginLeft={30}
                        onClick={() => onSubstrActionClick()}
                    >
                        Применить
                    </Button>
                </Pane>
                <Pane display={"flex"} marginBottom={20}>
                    <Paragraph marginLeft={40} textAlign={"left"}><b>Вернуть массив объектов, значение поля weaponType которых больше заданного</b></Paragraph>
                    <SelectField
                        marginLeft={30}
                        onChange={(e) => {setSupGroup(e.target.value) }}
                        value={supGroup}
                        textAlign={"start"}
                    >
                        <option value="HEAVY_BOLTGUN" selected>
                            HEAVY_BOLTGUN
                        </option>
                        <option value="MELTAGUN">
                            MELTAGUN
                        </option>
                        <option value="COMBI_FLAMER">
                            COMBI_FLAMER
                        </option>
                        <option value="PLASMA_GUN">
                            PLASMA_GUN
                        </option>
                        <option value="GRAV_GUN">
                            GRAV_GUN
                        </option>
                    </SelectField>
                    <Button
                        marginLeft={30}
                        onClick={() => onSuperiorGroupActionClick()}
                    >
                        Применить
                    </Button>
                </Pane>
            </Pane>

            <Pane width={"90vw"} margin={40}>
                <Table width={"100%"}>
                    <Table.Head>
                        <Table.TextHeaderCell >ID</Table.TextHeaderCell>
                        <Table.TextHeaderCell >NAME</Table.TextHeaderCell>
                        <Table.TextHeaderCell >X</Table.TextHeaderCell>
                        <Table.TextHeaderCell >Y</Table.TextHeaderCell>
                        <Table.TextHeaderCell >HEALTH</Table.TextHeaderCell>
                        <Table.TextHeaderCell >CATEGORY</Table.TextHeaderCell>
                        <Table.TextHeaderCell flexBasis={150}>WEAPON TYPE</Table.TextHeaderCell>
                        <Table.TextHeaderCell flexBasis={150}>MELEE WEAPON</Table.TextHeaderCell>
                        <Table.TextHeaderCell >CHAPTER's ID</Table.TextHeaderCell>
                        <Table.TextHeaderCell >CREATION DATE</Table.TextHeaderCell>
                        <Table.TextHeaderCell >Меню</Table.TextHeaderCell>
                    </Table.Head>

                        {spaceMarines.map((marine, index) =>
                            <Table.Row alignItems={"center"}>
                                <TableCell>{marine.id}</TableCell>
                                <TableCell >{marine.name}</TableCell>
                                <TableCell >{marine.coordinates.x}</TableCell>
                                <TableCell >{marine.coordinates.y}</TableCell>
                                <TableCell >{marine.health}</TableCell>
                                <TableCell >{marine.category}</TableCell>
                                <TableCell flexBasis={150}>{marine.weaponType}</TableCell>
                                <TableCell flexBasis={150}>{marine.meleeWeapon}</TableCell>
                                <Tooltip
                                    content={
                                        <Pane>
                                            <Paragraph>ID: {marine.chapter == undefined? '' :marine.chapter.id}</Paragraph>
                                            <Paragraph>Name: {marine.chapter == undefined? '' : marine.chapter.name}</Paragraph>
                                            <Paragraph>Marines count: {marine.chapter == undefined? '' : marine.chapter.marinesCount}</Paragraph>
                                            <Paragraph>Parent Legion: {marine.chapter == undefined? '' : marine.chapter.parentLegion}</Paragraph>
                                            <Paragraph>World: {marine.chapter == undefined? '' : marine.chapter.world}</Paragraph>
                                        </Pane>
                                    }
                                    appearance="card"
                                >
                                    <TableCell cursor={"pointer"}>{marine.chapter == undefined? '' : marine.chapter.id}</TableCell>
                                </Tooltip>

                                <TableCell >
                                    {
                                        marine.creationDate.date.day + ':' +
                                        marine.creationDate.date.month + ':' +
                                        marine.creationDate.date.year + ' ' +
                                        marine.creationDate.time.hour + '-' +
                                        marine.creationDate.time.minute
                                    }
                                </TableCell>
                                <TableCell >
                                    <Tooltip content={"Удалить"}>
                                        <IconButton icon={DeleteIcon} marginRight={10} onClick={() => onDeleteAction(marine.id, index)}/>
                                    </Tooltip>
                                    <Tooltip content={"Изменить"}>
                                        <IconButton icon={EditIcon} onClick={() => onChangeMarineAction(marine.id)} />
                                    </Tooltip>
                                </TableCell>
                            </Table.Row>
                        )}
                </Table>
            </Pane>
        </Pane>

    )
}

