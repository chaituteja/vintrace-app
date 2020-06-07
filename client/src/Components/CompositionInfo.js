import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class CompositionInfo extends Component {

    compositionOptions = [
        {id: 'Select your choice', value: ''},
        {id: 'Year', value: 'getYearBreakdown'},
        {id: 'Variety', value: 'getVarietyBreakdown'},
        {id: 'Region', value: 'getRegionBreakdown'},
        {id: 'Year and Variety', value: 'getYearAndVarietyBreakdown'}
      ]

    renderCompositions () {
        return this.props.selectedCompositionBreakdown.slice(0,this.props.breakDownLimit).map((item)=>{
          return(
            <tr key={item.key}>
                <td>
                    <span>
                        <span><strong>{this.props.selectedCompositionType}</strong> : {item.key}</span> <br /> 
                        <span><strong>Percentage </strong> : {item.percentage}</span><br/>
                    </span> 
                </td>
            </tr>
          );
      });
    }

    render () {

        return (
            <div className='margin-top margin-bottom'>
                <p>To get informaion about composition breakdown, please make a selection</p>
                <select  value={this.props.selectedComposition}
                    onChange={this.props.getCompositionBreakDown}>
                    {this.compositionOptions.map((item) => <option key={item.id} title={item.id} value={item.value}>{item.id}</option>)}
                </select>
                {this.props.selectedComposition && 
                    <div>
                        <Table bordered hover className='margin-top'>
                        <tbody>
                            {this.renderCompositions()}              
                        </tbody>
                        </Table>
                        {this.props.selectedCompositionBreakdown.length > this.props.breakDownLimit && 
                            <Button onClick={this.props.loadMore}>Show More </Button>
                        }
                    </div>
                }
          </div>
        )
    }
}

export default CompositionInfo;