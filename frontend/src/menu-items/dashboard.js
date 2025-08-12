import { DashboardOutlined } from '@ant-design/icons';

const icons = { DashboardOutlined };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'dashboard',
  type: 'group',
  url: '/dashboard',
  icon: icons.DashboardOutlined,
  breadcrumbs: false
};

export default dashboard;
