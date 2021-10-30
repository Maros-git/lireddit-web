import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';


interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter()
    const [{fetching: logoutFetching}, logout] = useLogoutMutation()
    const [{data, fetching}] = useMeQuery({
        pause: (isServer()),
    });
    let body = null

    //data is loading
    if (isServer() || fetching) {
        // body = null; no need to specify explicitly
        //user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href='/login'>
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link>Register</Link>
                </NextLink>
            </>
        );
        // user logged in
    } else {
        body = <Flex align="center">
            <NextLink href="/create-post">
                <Button  variant='link' mr={10}>
                    create post
                </Button>
            </NextLink>
                <Box mr={2}>{data.me.username}</Box>
                    <Button onClick={async () => {
                        await logout();
                        router.reload()
                    }}
                    isLoading={logoutFetching}
                    variant='link'>logout</Button>
                </Flex>
    }

    return (
        <Flex zIndex={1} position="sticky" top={0} bg='tan' p={4} >
            <Flex flex={1} align='center' m='auto' maxW={800}>
                <NextLink href="/">
                    <Link>
                        <Heading>LiReddit</Heading>
                    </Link>
                </NextLink>
                <Box ml={'auto'}>
                    {body}
                </Box>
            </Flex>
        </Flex>
    );
}