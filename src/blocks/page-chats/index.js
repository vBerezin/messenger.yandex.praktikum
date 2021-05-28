import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/utils/component';
import { ChatList } from '~blocks/chat-list';
import { FormSearch } from '~blocks/form-search';


class PageChats extends Component {
  constructor(props) {
    super({ template, props });
    this.search = new FormSearch();
    this.chats = new ChatList({
      chats: props.chats,
    });
  }

  render(container) {
    super.render(container);
    this.search.render(this.el.querySelector('.page-chats__search'));
    this.chats.render(this.el.querySelector('.page-chats__list'));
  }
}

export const pageChats = new PageChats({
  chats: [
    {
      title: 'Андрей',
      date: '10:49',
      count: 2,
      message: 'Изображение',
      image: '/images/avatars/1.png',
    },
    {
      title: 'Киноклуб',
      date: '12:00',
      message: '<span>Вы:</span> стикер',
      image: '/images/avatars/2.png',
    },
    {
      title: 'Илья',
      date: '12:00',
      count: 4,
      message: 'Друзья, у меня для вас особенный выпуск новостей!...',
      image: '/images/avatars/3.png',
    },
    {
      title: 'Андрей',
      date: '10:49',
      count: 2,
      message: 'Изображение',
      image: '/images/avatars/1.png',
    },
    {
      title: 'Киноклуб',
      date: '12:00',
      message: '<span>Вы:</span> стикер',
      image: '/images/avatars/2.png',
    },
    {
      title: 'Илья',
      date: '12:00',
      count: 4,
      message: 'Друзья, у меня для вас особенный выпуск новостей!...',
      image: '/images/avatars/3.png',
    },
    {
      title: 'Андрей',
      date: '10:49',
      count: 2,
      message: 'Изображение',
      image: '/images/avatars/1.png',
    },
    {
      title: 'Киноклуб',
      date: '12:00',
      message: '<span>Вы:</span> стикер',
      image: '/images/avatars/2.png',
    },
    {
      title: 'Илья',
      date: '12:00',
      count: 4,
      message: 'Друзья, у меня для вас особенный выпуск новостей!...',
      image: '/images/avatars/3.png',
    },
    {
      title: 'Андрей',
      date: '10:49',
      count: 2,
      message: 'Изображение',
      image: '/images/avatars/1.png',
    },
    {
      title: 'Киноклуб',
      date: '12:00',
      message: '<span>Вы:</span> стикер',
      image: '/images/avatars/2.png',
    },
    {
      title: 'Илья',
      date: '12:00',
      count: 4,
      message: 'Друзья, у меня для вас особенный выпуск новостей!...',
      image: '/images/avatars/3.png',
    },
  ],
});
