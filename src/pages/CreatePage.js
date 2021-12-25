import {Button, Checkbox, Pane, Paragraph, SelectField, TextInputField, toaster} from "evergreen-ui";
import React from "react";
import {createMarine, updateMarine} from "../api/Api";
import {XMLParser} from "fast-xml-parser";

export default function CreatePage({marineToChange, isEdit}) {

    const [newChapter, setNewChapter] = React.useState(true)
    const [withChapter, setWithChapter] = React.useState(false)

    const [marine, setMarine] = React.useState(marineToChange)
    const [messages, setMessages] = React.useState([])


    const [nameValid, setNameValid] = React.useState(marine.name != null && marine.name.trim() != '')
    const [healthValid, setHealthValid] = React.useState(marine.health != null && !isNaN(marine.health) && marine.health > 0 || marine.health == null)
    const [xValid, setXValid] = React.useState(marine.coordinates.x != null && !isNaN(marine.coordinates.x) && marine.coordinates.x <= 421)
    const [yValid, setYValid] = React.useState(marine.coordinates.y != null && !isNaN(marine.coordinates.y) && marine.coordinates.y <= 873)
    const [chaptersIdValid, setChaptersIdValid] = React.useState(marine.chapter!= null && marine.chapter.id != null && !isNaN(marine.chapter.id))
    const [chapterNameValid, setChapterNameValid] = React.useState(marine.chapter!= null && marine.chapter.name != null && marine.chapter.name.trim() != '')
    const [chapterMarinesCountValid, setChapterMarinesCountValid] = React.useState(marine.chapter!= null && marine.chapter.marinesCount != null && !isNaN(marine.chapter.marinesCount) &&
        marine.chapter.marinesCount >= 0  && marine.chapter.marinesCount <= 1000
    )

    const chapter = {
            id: null,
            name: '',
            parentLegion: '',
            marinesCount: null,
            world: ''
        }


    function create() {
        console.log("MARINE TO CREATE" + JSON.stringify(marine))

        if (!withChapter) {
            marine.chapter = null
        }

        createMarine(marine).then(res => {
            toaster.success("Успешно создали!")
        }).catch(error => {
            toaster.danger("Ошибка при создании пехотинца! Убедитесь, что все необходимые параметры введены верно!")
            if (error.response) {
                const parser = new XMLParser();
                let obj = parser.parse(error.response.data);

                if (!Array.isArray(obj.messages.messages.message)) {
                    setMessages([obj.messages.messages.message])
                } else {
                    setMessages(obj.messages.messages.message)
                }
            }
        })
    }

    function update(id) {
        console.log("MARINE TO UPDATE" + JSON.stringify(marine))

        removeUndefined()

        updateMarine(marine, id).then(res => {
            toaster.success("Успешно обновили!")
        }).catch(error => {
            toaster.danger("Ошибка при обновлении пехотинца! Убедитесь, что все необходимые параметры введены верно!")
            if (error.response) {
                const parser = new XMLParser();
                let obj = parser.parse(error.response.data);

                if (!Array.isArray(obj.messages.messages.message)) {
                    setMessages([obj.messages.messages.message])
                } else {
                    setMessages(obj.messages.messages.message)
                }
            }
        })
    }

    function removeUndefined() {
        if (marine.category == undefined) marine.category = "NONE"
        if (marine.meleeWeapon == undefined) marine.meleeWeapon = "NONE"
        if (marine.weaponType == undefined) marine.weaponType = "NONE"
    }

    return (
        <Pane margin={50} alignItems={"center"}>
            {isEdit ? <h1 align={"start"}>Изменить пехотинца!</h1> : <h1 align={"start"}>Создать пехотинца!</h1>}
            <Pane>
                {messages.map(m => <Paragraph color={"red"} marginTop={10} marginLeft={40} textAlign={"left"}>{m}</Paragraph>)}
            </Pane>
            <Pane display={"flex"}>
                <Pane>
                    <TextInputField
                        isInvalid={!nameValid}
                        required={true}
                        label="Name"
                        defaultValue={marine.name}
                        description="Введите имя"
                        onChange={e => {
                            marine.name = e.target.value
                            setNameValid(marine.name != null && marine.name.trim() != '')
                        }}
                        validationMessage="Поле обязательно для заполнения и не может быть пустым"
                        textAlign={"start"}
                    />

                    <TextInputField
                        isInvalid={!healthValid}
                        label="Health"
                        defaultValue={marine.health}
                        description="Введите здоровье"
                        onChange={e => {
                            const val = e.target.value.trim()
                            marine.health = val == '' ? null : val
                            setHealthValid(marine.health != null && !isNaN(marine.health) && marine.health > 0 || marine.health == null)
                        }}
                        validationMessage="Число. Должно быть больше 0"
                        textAlign={"start"}
                    />

                    <TextInputField
                        isInvalid={!xValid}
                        required={true}
                        label="Х"
                        defaultValue={marine.coordinates.x}
                        description="Введите Х"
                        onChange={e => {
                            marine.coordinates.x = e.target.value
                            setXValid(marine.coordinates.x != null && !isNaN(marine.coordinates.x) && marine.coordinates.x <= 421)
                        }}
                        validationMessage="Число. Обязательно для заполнения. Должно быть меньше или равно 421"
                        textAlign={"start"}
                    />

                    <TextInputField
                        isInvalid={!yValid}
                        required={true}
                        label="Y"
                        defaultValue={marine.coordinates.y}
                        description="Введите Y"
                        onChange={e => {
                            marine.coordinates.y = e.target.value
                            setYValid(marine.coordinates.y != null && !isNaN(marine.coordinates.y) && marine.coordinates.y <= 873)
                        }}
                        validationMessage="Число. Обязательно для заполнения. Должно быть меньше или равно 873"
                        textAlign={"start"}
                    />

                    <SelectField
                        textAlign={"start"}
                        defaultValue={marine.category}
                        onChange={e => marine.category = e.target.value}
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

                    <SelectField
                        defaultValue={marine.weaponType}
                        textAlign={"start"}
                        onChange={e => marine.weaponType = e.target.value}
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

                    <SelectField
                        defaultValue={marine.meleeWeapon}
                        textAlign={"start"}
                        onChange={e => {
                            marine.meleeWeapon = e.target.value
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

                </Pane>
                <Pane marginLeft={150}>
                    <Checkbox checked={withChapter} onChange={e => {
                        setWithChapter(e.target.checked)
                        if (e.target.checked == true) {
                            marine.chapter = chapter
                        }
                    }} label={"C chapter'ом"}/>
                    <Pane display={withChapter? "block" : "none"}>
                        <Checkbox checked={newChapter} onChange={e => setNewChapter(e.target.checked)} label={"Новый chapter"}/>
                        <TextInputField
                            isInvalid={!chaptersIdValid}
                            defaultValue={marine.chapter!= null ? marine.chapter.id : ''}
                            required={withChapter && !newChapter}
                            display={newChapter ? "none" : "block"}
                            label="Chapter's ID"
                            onChange={e => {
                                marine.chapter.id = e.target.value
                                setChaptersIdValid(marine.chapter!= null && marine.chapter.id != null && !isNaN(marine.chapter.id))
                            }}
                            description="Введите chapter's ID"
                            validationMessage="Число. Обязательно для заполнения"
                            textAlign={"start"}
                        />

                        <TextInputField
                            isInvalid={!chapterNameValid}
                            display={newChapter ? "block" : "none"}
                            required={withChapter && newChapter}
                            defaultValue={marine.chapter!= null ? marine.chapter.name : ''}
                            label="Chapter's name"
                            description="Введите chapter's name"
                            onChange={e => {
                                marine.chapter.name = e.target.value
                                setChapterNameValid(marine.chapter!= null && marine.chapter.name != null && marine.chapter.name.trim() != '')
                            }}
                            validationMessage="Поле обязательно для заполнения и не может быть пустым"
                            textAlign={"start"}
                        />

                        <TextInputField
                            isInvalid={false}
                            display={newChapter ? "block" : "none"}
                            defaultValue={marine.chapter!= null ? marine.chapter.parentLegion : ''}
                            label="Chapter's parent legion"
                            onChange={e =>marine.chapter.parentLegion = e.target.value}
                            description="Введите chapter's parent legion"
                            textAlign={"start"}
                        />

                        <TextInputField
                            isInvalid={!chapterMarinesCountValid}
                            display={newChapter ? "block" : "none"}
                            defaultValue={marine.chapter!= null ? marine.chapter.marinesCount : ''}
                            label="Chapter's marines count"
                            onChange={e => {
                                marine.chapter.marinesCount = e.target.value
                                setChapterMarinesCountValid(marine.chapter!= null && marine.chapter.marinesCount != null && !isNaN(marine.chapter.marinesCount) &&
                                    marine.chapter.marinesCount >= 0  && marine.chapter.marinesCount <= 1000)
                            }}
                            validationMessage="Число. Обязательно для заполнения. Должно быть не меньше 0 и не больше 1000"
                            description="Введите chapter's marines count"
                            textAlign={"start"}
                        />


                        <TextInputField
                            isInvalid={false}
                            required={withChapter && newChapter}
                            display={newChapter ? "block" : "none"}
                            defaultValue={marine.chapter!= null ? marine.chapter.world : ''}
                            label="Chapter's world"
                            onChange={e =>marine.chapter.world = e.target.value}
                            description="Введите chapter's world"
                            textAlign={"start"}
                        />
                    </Pane>
                </Pane>
            </Pane>
            {
                isEdit?
                    <Button
                        disabled={!((nameValid && healthValid && xValid && yValid)&&(!withChapter || withChapter&&(chaptersIdValid || chapterNameValid)))}
                        marginBottom={30}
                        onClick={() => update(marine.id)}
                        width={"40%"}
                    >
                        Обновить
                    </Button>
                    :
                    <Button
                        disabled={!((nameValid && healthValid && xValid && yValid)&&(!withChapter || withChapter&&(chaptersIdValid || chapterNameValid)))}
                        marginBottom={30}
                        onClick={() => create()}
                        width={"40%"}
                    >
                        Создать
                    </Button>
            }

        </Pane>

    )
}