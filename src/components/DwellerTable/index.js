import Special from '@/components/Special';
import testDwellers from '@/store/testDwellers';

function generateHeaderRow({ colValues }) {
    function generateColumns() {
        return colValues.map(colValue =>
            <th scope="col">{colValue}</th>
        )
    }
    return <tr>
            {generateColumns()}
        </tr>
}

function generateRow({ rowHeader, colValues }) {
    return (
        <tr>
            <th scope="row">{rowHeader}</th>
            {colValues.map(colValue => <td>{colValue}</td>)}
        </tr>
    );
}

function generateDwellerTable() {
    const getRowData = ({ firstName, lastName, special }) => ({
            rowHeader: firstName + ' ' + lastName,
            colValues: Array.from(special),
        });

    const table = () => testDwellers.map(dwellerData =>{
        return generateRow(getRowData(dwellerData));
    });
    return (
        table()
    );
}

export default function template() {
    return (
        <div>
            <h2>DwellerTable placeholder</h2>
            <table>
                <caption>
                    Vault Dwellers
                </caption>
                <thead>
                    {
                        generateHeaderRow({
                            colValues: ['Dweller Name',...'SPECIAL']
                        })
                    }
                </thead>
                <tbody>
                    { generateDwellerTable() }
                </tbody>
            </table>
            <Special/>
        </div>
    )
}