import Special from '@/components/Special';
import testDwellers from '@/store/testDwellers';

function generateHeaderRow({ tableCaption, colValues }) {
    return <>
        <caption>
            {tableCaption}
        </caption>
        <tr>
            {colValues.map(colValue =>
                    <th scope="col">{colValue}</th>
            )}
        </tr>
    </>
}

function generateRow({ rowHeader, colValues }) {
    return colValues.map(colValue =>
        <tr>
            <th scope="row">{rowHeader}</th>
            <td>{colValue}</td>
        </tr>
    );
}

function generateDwellerTable() {
    const getRowData = ({ firstName, lastName, special }) => ({
            rowHeader: firstName + ' ' + lastName,
            colValues: Array.from(special),
        });
    const table = () => testDwellers.map(dwellerData => 
        generateRow(getRowData(dwellerData)));
    return (
        <>
        {table()}
        </>
    );
}

export default function template() {
    return (
        <div>
            <h2>DwellerTable placeholder</h2>
            <table>
                { generateHeaderRow({tableCaption: 'Vault Dwellers', colValues: [...'SPECIAL']}) }
                { generateDwellerTable() }
            </table>
            <Special/>
        </div>
    )
}