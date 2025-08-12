// assets
import { DashboardOutlined, EditOutlined, GoldOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  EditOutlined,
  DashboardOutlined,
  GoldOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: 'pages',
  type: 'group',
  children: [
    {
      id: 'post',
      title: 'post',
      type: 'collapse',
      icon: icons.GoldOutlined,
      children: [
        {
          id: 'post',
          title: 'posts',
          type: 'item',
          url: '/post/posts'
        },
      ]
    },
    {
      id: 'user',
      title: 'user',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'user',
          title: 'user',
          type: 'item',
          url: '/user/user'
        },
        {
          id: 'password',
          title: 'password',
          type: 'item',
          url: '/user/password'
        }
      ]
    }
  ]
};

export default pages;
