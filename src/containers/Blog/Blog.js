import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        fullPostId: null
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res =>{
                const posts = res.data.slice(0, 4);
                const addAuthor = posts.map(post =>{
                    return {
                        ...post,
                        author: 'Ismaeel'
                    }
                });

                this.setState({posts: addAuthor});

            })
    }

    selectPostHandler = (id) =>{
        this.setState({fullPostId: id})
    }


    render () {

        let posts = this.state.posts.map(post => {
            return <Post 
            key={post.id} 
            title={post.title} 
            author={post.author} 
            clicked={()=> this.selectPostHandler(post.id)}></Post>
        })
        return (
            <div>
                <section className="Posts">
                    {/* <Post />
                    <Post />
                    <Post /> */}
                    {posts}
                </section>
                <section>
                    <FullPost 
                    id={this.state.fullPostId} 
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;