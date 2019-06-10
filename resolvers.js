const resolvers = {
    Query: {
      me: () => {
        return {
          username: 'Guy Rawsthorn',
        };
      },
    },
  };
  
export default resolvers