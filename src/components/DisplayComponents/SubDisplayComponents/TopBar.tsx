let TopBarStyle = {
    padding: "20px 20px 0px",
}

let TopBarTabStyle = {
    color: "black",
}

let TopBarTabStyleSelect = {
    backgroundColor: "#C0C0C0",
    color: "black",
}

let TopBarButtonStyle = {
    paddingRight: "50px",
    paddingLeft: "50px",
    outline: "none",
}

export interface TabData<Enum> {
    tabOption: Enum,
    new: boolean,
    onNew: Function,
}

export interface TopBarProps<Enum> {
    header: string,
    tabSelect: Enum,
    onTabSelect: React.Dispatch<React.SetStateAction<Enum>>,
    tabData: Array<TabData<Enum>>
}

export function TopBar<Enum>(props: TopBarProps<Enum>) {
    const {tabSelect, tabData, onTabSelect ,header} = props;

    let newButton: Boolean = false;
    let newButtonFunction: Function = () => {}

    return (
        <div style={TopBarStyle}>
            <h1>{header}</h1>
            <ul className="nav nav-tabs">
                {
                    tabData.map((td, i) => {
                        let tabName: string = td.tabOption.toString(); 
                        let tabClassSelect = td.tabOption === tabSelect ? "active" : "";
                        let tabClassSelectStyle = td.tabOption === tabSelect ? TopBarTabStyleSelect : TopBarTabStyle;
                        newButton = td.tabOption === tabSelect ? td.new : newButton;
                        newButtonFunction = td.tabOption === tabSelect ? td.onNew : newButtonFunction;
                        return (
                            <li key={tabName} className="nav-item">
                                <button
                                    className={"nav-link " + tabClassSelect}
                                    style={tabClassSelectStyle}
                                    onClick={() => {onTabSelect(td.tabOption)}}
                                    >
                                    {tabName}
                                </button>
                            </li>
                        )
                    })
                }
                <li className="nav-item ml-auto" style={{marginLeft: "auto"}}>
                    {newButton &&
                    <button
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    onClick={() => {newButtonFunction()}}
                    className="btn btn-primary"
                    style={TopBarButtonStyle}
                    >
                    New
                    </button>
                    }
                </li>
            </ul>
        </div>
    )
}