import React from 'react';
import '../App.css';

export default class Relics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relic: "",
            drops: [],
            intactPrice: 0,
            radiantPrice: 0
        }
                
    }

    handleSearch = relic => {
        let relicParts = relic.split(' ');
        let url = "http://fyrecean.com:81/relic/" + relicParts[0] + "/" + relicParts[1];
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let radPrice = 0;
            let intPrice = 0;
            for (let i = 0; i < data.length; i++) {
                switch(data[i].rarity) {
                    case("Common"):
                        radPrice += data[i].price * .1667;
                        intPrice += data[i].price * .2533;
                        break;
                    case("Uncommon"):
                        radPrice += data[i].price * .2;
                        intPrice += data[i].price * .11;
                        break;
                    case("Rare"):
                        radPrice += data[i].price * .1;
                        intPrice += data[i].price * .02;
                        break;
                    default:
                }
            }
            this.setState({
                relic: relic,
                drops: data,
                intactPrice: intPrice,
                radiantPrice: radPrice,
            });
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    render() {
        let hide = this.state.drops.length === 0;
        let averages = [];
        if (!hide) {
            averages = [
                <li>{"Radiant Average: " + Math.round(this.state.radiantPrice * 10)/10}</li>,
                <li>{"Intact Average: " + Math.round(this.state.intactPrice * 10)/10}</li>
            ]
        }
        return (
            <div>
                <Search handler={this.handleSearch}/>
                <h2>{this.state.relic.toUpperCase() + (hide && this.state.relic.length !== 0 ? " - Not Found" : "")}</h2>
                <Table data={this.state.drops}/>
                <ul>
                    {averages}
                </ul>
            </div>
        )
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        }
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onKeyUp(event) {
        console.log(event);
        if (event.key === "Enter") {
            this.props.handler(this.state.inputValue);
        }
    }

    render() {
        return (
            <div>
                <input 
                    value={this.state.inputValue} 
                    onChange={evt => this.setState({inputValue: evt.target.value})}
                    onKeyPress={this.onKeyUp}
                />
                <button onClick={() => this.props.handler(this.state.inputValue)}>Go</button>
            </div>
        )
    }
}

class Table extends React.Component {
    render() {
        let titles = (
            <thead>
                <tr>
                    <th className="name">Item</th>
                    <th className="rarity">Rarity</th>
                    <th className="price">Price</th>
                </tr>
            </thead>
        );
        let rows = Array(this.props.data.length);
        for (let i = 0; i < rows.length; i++) {
            rows[i] = <TableRow key={this.props.data[i].item} row={this.props.data[i]}/>
        }
        return (
            <table>
                {rows.length !== 0 ? titles : []}
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

function TableRow(props) {
    return (
        <tr>
            <td className="name">{props.row.item}</td>
            <td className="rarity">{props.row.rarity}</td>
            <td className="price">{props.row.price === 0 ? "N/A" : props.row.price}</td>
        </tr>
    );
}