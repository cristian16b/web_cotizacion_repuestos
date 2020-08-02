import React , { Component } from 'react';

export class Collapsible extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
        this.setState({open: !this.state.open});
        // if(!this.state.open)
        //     console.log('click se abre');
    }

    componentDidUpdate(){
        
    }

    render() {
      return (
                <div>
                    <div onClick={(e)=>this.togglePanel(e)} className={`header ${this.props.className}`} >
                        {this.props.title}
                    </div>
                    {
                        this.state.open ? 
                        (
                            <div className='content'>
                                {this.props.children}
                            </div>
                        )              
                        :
                        null
                    }
                </div>
            );
    }
}