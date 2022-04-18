import React from 'react';

const ListTable = ({data, headers, actions, id}) => {

    return (
        <div>
        {
            !data ? ("No data found.") : (
                <table className='table table-hover table-bordered table-condensed'>
                    <thead>
                        <tr>
                            {
                                headers.map(row => (
                                    <td key={row.key}>{row.label}</td>
                                ))
                            }
                            <td className='fitwidth'></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, index) => (
                                <tr className='table-row' key={index}>
                                    {
                                        headers.map(row => 
                                            (row.key).split('.').reduce(function (o, k) {return o && o[k]}, d)).map(item => (<td>{item}</td>)
                                        )
                                    }
                                    <td>
                                    {
                                        actions.map(act => (
                                            <button 
                                                style={{marginLeft: "5px"}}
                                                className={act.cName}
                                                onClick={() => act.func(d[id])}
                                            >
                                                {act.label}
                                            </button>
                                        ))
                                    }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
        </div>
    )
}

export default ListTable;