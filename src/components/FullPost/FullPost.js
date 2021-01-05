import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state = {
        postLoaded: null
    }

    componentDidUpdate(){
        if(this.props.id){
            if(!this.state.postLoaded || (this.state.postLoaded && this.state.postLoaded.id !== this.props.id))
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id )
            .then(res =>{
                this.setState({postLoaded:res.data});
            })
        }
    }

    deletePostHandler = (id) =>{
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + id)
        .then(res=>{
            console.log(res);
        })
    }   
    
    render (props) {
        let post = <p>Please select a Post!</p>;
        if(this.props.id){
            post = <p>Loading...</p>;
        }
        if(this.state.postLoaded){
            post = (
            <div className="FullPost">
                <h1>{this.state.postLoaded.title}</h1>
                <p>{this.state.postLoaded.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={()=>this.deletePostHandler(this.props.id)}>Delete</button>
                </div>
            </div>

        );}
        return post;
    }
}

export default FullPost;