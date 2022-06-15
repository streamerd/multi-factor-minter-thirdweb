import { Box, Grommet, ResponsiveGrid, ResponsiveContext } from "grommet";

// import { AlphaFooter } from "./Footer";
import { deepMerge } from "grommet/utils";
export const Griddy = () => {

    const theme  = deepMerge({
        global: {
          colors: {
            brand: 'white',
            dark: "blue",
          },
          font: {
            size: '20px',
            height: '20px',
          },
          breakpoints: {
            xsmall: {
              value: 500,
            },
            small: {
              value: 900,
            },
            medium: undefined,
            middle: {
              value: 3000,
            },
          },
        },
      });

  return (
    <Grommet theme={theme} full>
    <ResponsiveContext.Consumer>
      {size => (<ResponsiveGrid
           responsive= {true}
           rows={['small', 'small', 'small', 'small']}
           columns={['medium', 'medium']}
           gap="medium"
           areas={{
           xsmall: [
             { name: 'one', start: [0, 0], end: [0, 0] },
             { name: 'two', start: [0, 1], end: [0, 1] },
             { name: 'three', start: [0, 2], end: [0, 2] },
             { name: 'four', start: [0, 3], end: [0, 3] },
           ],
           small: [
             { name: 'one', start: [0, 0], end: [1, 0] },
             { name: 'two', start: [0, 1], end: [1, 1] },
             { name: 'three', start: [0, 2], end: [1, 2] },
             { name: 'four', start: [0, 3], end: [1, 3] },
           ],
           medium: [
             { name: 'one', start: [0, 0], end: [1, 0] },
             { name: 'two', start: [0, 1], end: [1, 1] },
             { name: 'three', start: [0, 2], end: [1, 2] },
             { name: 'four', start: [0, 3], end: [1, 3] },
           ],
           middle: [
             { name: 'one', start: [0, 0], end: [1, 0] },
             { name: 'two', start: [1, 0], end: [1, 0] },
             { name: 'three', start: [0, 1], end: [0, 1] },
             { name: 'four', start: [1, 1], end: [1, 1] },
           ]
         }}
        >
         <Box gridArea="one" background="green" /><Box gridArea="two" background="red" /><Box gridArea="three" background="blue" /><Box gridArea="four" background="cyan" /></ResponsiveGrid>)}
    </ResponsiveContext.Consumer>
  </Grommet>
);
};
