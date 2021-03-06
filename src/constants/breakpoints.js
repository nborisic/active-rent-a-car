// Breakpoints need to match ones defined in "var.scss"
export const MEDIA_QUERIES = {
    SM: '(min-width: 0)',
    MD: '(min-width: 600px)',
    LG: '(min-width: 1100px)',
  };

  const BREAKPOINTS = [
    {
      media: MEDIA_QUERIES.SM,
      name: 'sm',
    },
    {
      media: MEDIA_QUERIES.MD,
      name: 'md',
    },
    {
      media: MEDIA_QUERIES.LG,
      name: 'lg',
    },
  ];

  export default BREAKPOINTS;
