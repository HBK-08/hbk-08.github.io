export const courses = [
  { id: 'vision', code: 'CV', title: '计算机视觉', english: 'Computer Vision', desc: '从成像几何到三维重建，理解像素背后的空间。', art: '靛蓝色三维曲面点云与投影几何插画' },
  { id: 'network', code: 'NET', title: '计算机网络', english: 'Computer Networks', desc: '沿着一个分组，观察节点、链路和协议怎样协作。', art: '靛蓝色网格上的网络节点与珊瑚色路径' },
  { id: 'language', code: 'NLP', title: '自然语言处理', english: 'Natural Language Processing', desc: '从词的表示到注意力，拆开语言模型的计算过程。', art: '由词元之间的连接弧线与注意力矩阵构成的插画' }
] as const;

export function href(path = '') {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
