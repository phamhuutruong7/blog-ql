import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import './bootstrap';

import Post from './Post';
import PostList from './PostList';
import TopicPostList from "./TopicPostList";
import AuthorPostList from "./AuthorPostList";

window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(VueApollo);



const routes = [
    {
        path: '/',
        name: 'index',
        component: PostList
    },
    {
        path: '/post/:id',
        name: 'post',
        component: Post
    },
    {
        path: '/topics/:slug',
        name: 'topic',
        component: TopicPostList
    },
    {
        path: '/authors/:id',
        name: 'author',
        component: AuthorPostList
    },
    {
       path: '*',
       name: '404',
       component: {
           template: '<div>Not found</div>'
       }
    }
];

const apolloClient = new ApolloClient({
    //Better use absolute URL
    uri: 'http://127.0.0.1:8000/graphql'
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

const router = new VueRouter({
    mode: 'history',
    routes
});

import moment from "moment";

Vue.filter("timeago", value => moment(value).fromNow());
Vue.filter("longDate", value => moment(value).format("MMMM Do YYYY"));

const app = new Vue({
    el: '#app',
    apolloProvider,
    router
});
