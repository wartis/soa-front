import axios from "axios";
import {marineToXml} from "../converters/MarineConverter";

export function createMarine(marine) {
    const xmlData = marineToXml(marine)

    return axios.post("http://localhost:59712/lab1/spacemarines", xmlData, {
        "Content-Type": "application/xml; charset=utf-8"
    })
}

export function updateMarine(marine, id) {
    const xmlData = marineToXml(marine)

    return axios.put("http://localhost:59712/lab1/spacemarines/" + id, xmlData, {
        "Content-Type": "application/xml; charset=utf-8"
    })
}

export function deleteMarine(id) {
    return axios.delete("http://localhost:59712/lab1/spacemarines/" + id)
}

export function getChaptersInGroup() {
    return axios.get("http://localhost:59712/lab1/spacemarines/chapters/group", {
        "Content-Type": "application/xml; charset=utf-8"
    })
}

export function getAll(filterStr, sortStr, paginationStr) {
    return axios
        .get("http://localhost:59712/lab1/spacemarines?" + filterStr + sortStr + paginationStr, {
            "Content-Type": "application/xml; charset=utf-8"
        })
}

export function getAllBySubstring(subst) {
    return axios
        .get("http://localhost:59712/lab1/spacemarines/name/substr?" + "nameSubstr=" + subst, {
            "Content-Type": "application/xml; charset=utf-8"
        })
}

export function getAllBySuperiorGroup(supGroup) {
    return axios
        .get("http://localhost:59712/lab1/spacemarines/weaponType/superior-group?" + "weaponType=" + supGroup, {
            "Content-Type": "application/xml; charset=utf-8"
        })
}

export function getById(id) {
    return axios
        .get("http://localhost:59712/lab1/spacemarines/" + id, {
            "Content-Type": "application/xml; charset=utf-8"
        })
}