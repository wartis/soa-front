import {Pane, Paragraph, toaster} from "evergreen-ui";
import React from "react";
import {getChaptersInGroup} from "../api/Api";
import {XMLParser} from "fast-xml-parser";

export default function ChapterGroupPage() {

    const [chapters, setChapters] = React.useState([])

    React.useEffect(() => {
        getChaptersInGroup().then(res => {
            const parser = new XMLParser();
            let obj = parser.parse(res.data);

            console.log(obj)

            if (obj.chaptersInGroup.group.chapterInGroupElementDto == undefined) {
                setChapters([])

            } else {
                if (obj.chaptersInGroup.group.chapterInGroupElementDto.chapter != undefined) {
                    console.log("Here - 1")
                    setChapters([obj.chaptersInGroup.group.chapterInGroupElementDto.chapter])
                    // chapters.push(obj.chaptersInGroup.group.chapterInGroupElementDto.chapter)
                } else {
                    setChapters(obj.chaptersInGroup.group.chapterInGroupElementDto)
                    console.log("Установили")
                }
            }
        }).catch(ex => toaster.danger("Ошибка при выполнении запроса!"))
    }, [])

    //<Paragraph><b>CHAPTER:</b> {el.name} (c id {el.id}) <b>КОЛ-ВО ПЕХОТИНЦЕВ:</b> {el.number}</Paragraph>
    return (
        <Pane margin={100}>
            <h3>Кол-во элементов в группах по chapter'у:</h3>
            {chapters.map(el => <Paragraph><b>CHAPTER:</b> {el.name} (c id {el.id}) <b>КОЛ-ВО ПЕХОТИНЦЕВ:</b> {el.marinesCount}</Paragraph>)}
        </Pane>
    )
}