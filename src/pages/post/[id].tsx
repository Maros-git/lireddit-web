import { Box, Heading, Link } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import NextLink from 'next/link';


const Post = ({}) => {
    const [{data, error, fetching}] = useGetPostFromUrl();

    if (fetching) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        );
    }

    if(error) {
        return <div>{error.message}</div>
    }

    if(!data?.post) {
        return (
            <Layout>
                <Box>Could not find post</Box>
            </Layout>
        )
    }

    return <Layout>
        <NextLink href="/">
        <Link>Back</Link>
        </NextLink>
        <Heading mb={5}>{data.post.title}</Heading>
        <Box mb={4}>{data.post.text}</Box>
        <EditDeletePostButtons 
            id={data.post.id} 
            creatorId={data.post.creator.id}/>
        </Layout>
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);