import React from "react";
import {DoubleChevronRightIcon, IconButton, Pane, Tooltip, Menu, Heading, CrossIcon} from "evergreen-ui";
import {Link} from "react-router-dom";

function Sidebar({showSidebar}) {

    return (
        <Pane
            display="grid"
            gridTemplateRows="max-content max-content 1fr max-content"
            boxShadow="10px 0px 10px -8px rgba(0, 0, 0, 0.25)"
            maxWidth={300}
            padding=".5em"
            gridRowGap=".2em"
            zIndex="3"
            minWidth="300px"
        >
            <Pane
                display="grid"
                gridTemplateColumns="1fr max-content max-content"
                alignItems="center"
                gridColumnGap=".2em"
            >
                <Heading>Меню</Heading>
                <Tooltip content="Скрыть панель">
                    <IconButton
                        appearance="minimal"
                        icon={CrossIcon}
                        onClick={() => showSidebar(false)}
                    />
                </Tooltip>
            </Pane>
            <Pane
                backgroundColor="#fff"
            >
                <Menu>
                    <Menu.Group>
                        <Menu.Item is={Link} to="">Космические пехотинцы</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item is={Link} to="create">Создать пехотинца</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item is={Link} to="chapters/group">Сгруппированные пехотинцы</Menu.Item>
                    </Menu.Group>
                </Menu>
            </Pane>
        </Pane>
    );
}

function HiddenSidebar({showSidebar}) {

    return (
        <Pane
            display="grid"
            boxShadow="10px 0px 10px -8px rgba(0, 0, 0, 0.25)"
            padding=".5em"
            gridRowGap=".2em"
            zIndex="1"
        >
            <Tooltip content="Показать панель">
                <IconButton
                    appearance="minimal"
                    icon={DoubleChevronRightIcon}
                    onClick={() => showSidebar(true)}
                />
            </Tooltip>
        </Pane>
    );
}

export default function ConstructorSidebarWrapper() {
    const [showSidebar, setShowSidebar] = React.useState(true);
    return showSidebar
        ? <Sidebar showSidebar={setShowSidebar}/>
        : <HiddenSidebar showSidebar={setShowSidebar}/>;
}