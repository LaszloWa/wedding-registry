import React from 'react';
import { Box, Stack, Flex } from '@sanity/ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const routes = [
  { title: 'Home', path: '/' },
  { title: 'Details', path: '/details' },
  { title: 'Travel & Accommodation', path: '/travel' },
  { title: 'Registry', path: '/registry' },
];

const NavLink = styled(Link)`
  text-decoration: none;
  text-transform: capitalize;
  color: inherit;
`;

const RsvpButton = styled(NavLink)`
  background: #869f77;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 60px;
`;

export const Navigation = () => {
  return (
    <Stack paddingTop={5} space={4} style={{ textAlign: 'center' }}>
      <Flex justify="center">
        {routes.map(route => (
          <Box key={route.path} paddingX={3}>
            <NavLink to={route.path}>{route.title}</NavLink>
          </Box>
        ))}
        <Box paddingX={3}>
          <RsvpButton to={'/rsvp'}>RSVP</RsvpButton>
        </Box>

        <Flex justify="center"></Flex>
      </Flex>
    </Stack>
  );
};
