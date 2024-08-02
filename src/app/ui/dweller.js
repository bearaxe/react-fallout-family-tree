//keeping because i'm convinced both that there is no legitimate need to use it but ALSO that it's absolutely going to be necessary for some reason lol #conflicted
export function TableDisplay() {
  return <>
    <input class="search-bar" v-model="query" type="text" placeholder="Search" />
    <DwellerTable dwellerTableData={testDwellers} />
  </>
}

function generateSelect(listOfOptions) {
  return <select>
    {listOfOptions.map(optionName => <option>{optionName}</option>)}
    </select>
}

export function ParentSelectDropdown({ parentList }) {
  return generateSelect(parentList)
}

export function ParentOffspringTable({ parentData }) {
  const placeholder = <a href='#'>test</a>;

  return <>
    <h3>{parentData.firstName} {parentData.lastName}</h3>
    <DwellerTable dwellerTableData={parentData.children} cornerTableDisplay={placeholder}/>
  </>
}