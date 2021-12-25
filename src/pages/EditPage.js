import CreatePage from "./CreatePage";
import {editMarine} from "../objects/DefaultMarine";

export default function EditPage() {
    return <CreatePage marineToChange={editMarine} isEdit={true}/>
}