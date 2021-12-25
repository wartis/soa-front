import React from "react";
import {Checkbox, Pane, SelectField, TextInputField} from "evergreen-ui";

export default function FilterComponent() {

    function nameFilter() {
        return <td colSpan={2}>
            <TextInputField
                isInvalid={false}
                label="Name*"
                description="Введите имя или часть имени"
                validationMessage="This field is required"
                textAlign={"start"}
            />
        </td>
    }

    function minMaxX() {
        return <>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Min X*"
                    description="Введите минимальный Х"
                    validationMessage="This field is required"
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max X*"
                    description="Введите максимальный Х"
                    validationMessage="This field is required"
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
                    validationMessage="This field is required"
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max Y*"
                    description="Введите максимальный Y"
                    validationMessage="This field is required"
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
                    validationMessage="This field is required"
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max-Health*"
                    description="Введите максимальное здоровье"
                    validationMessage="This field is required"
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
                description="Введите родительский легион"
                validationMessage="This field is required"
                textAlign={"start"}
            />
        </td>
    }

    function chapterWorld() {
        return <td colSpan={2}>
            <TextInputField
                isInvalid={false}
                label="Chapter world*"
                description="Введите мир главаря"
                validationMessage="This field is required"
                textAlign={"start"}
            />
        </td>
    }

    function chapterName() {
        return <td colSpan={2}>
            <TextInputField
                isInvalid={false}
                label="Chapter parent legion*"
                description="Введите имя главаря"
                validationMessage="This field is required"
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
                    validationMessage="This field is required"
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max chapter id*"
                    description="Введите максимальный chapter id"
                    validationMessage="This field is required"
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
                    description="Введите минимальный кол-во пехотинцев"
                    validationMessage="This field is required"
                    textAlign={"start"}
                />
            </td>
            <td>
                <TextInputField
                    isInvalid={false}
                    label="Max marines count*"
                    description="Введите максимальный кол-во пехотинцев"
                    validationMessage="This field is required"
                    textAlign={"start"}
                />
            </td>
        </>
    }


    const [isFilterSelected, setIsFilterSelected] = React.useState(false)
    const [isSortSelected, setIsSortSelected] = React.useState(false)


    return (
        <Pane margin={50} >
            <Checkbox checked={isFilterSelected} onChange={e => setIsFilterSelected(e.target.checked)} label={"Фильтр"}/>
            <Pane display={isFilterSelected ? "flex" : "none"} >
                <Pane>
                    <table>
                        {/* ФИЛЬТР */}
                        <tr><th colSpan={2}>SPACEMARINE</th></tr>
                        <tr>{nameFilter()}</tr>
                        <tr>{minMaxX()}</tr>
                        <tr>{minMaxY()}</tr>
                        <tr>{minMaxHealth()}</tr>
                        <tr><td height={130} colSpan={2}></td></tr>
                        {/* СОРТИРОВКА */}
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
                    label="Сортировать по"
                >
                    <option value="foo" selected>
                        Foo
                    </option>
                    <option value="bar">Bar</option>
                </SelectField>
                <SelectField
                    textAlign={"start"}
                    label="Порядок сортировка"
                >
                    <option value="foo" selected>
                        ASC
                    </option>
                    <option value="bar">DESC</option>
                </SelectField>
            </Pane>
        </Pane>


    )
}