import Head from "next/head";
import { Box, Heading } from "@chakra-ui/core";

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Home</title>
      </Head>

      <Heading paddingBottom="5" size="lg">
        사용된 라이브러리 및 프레임 워크
      </Heading>
      <ul>
        <li>@chakra-ui/core: ^0.8.0</li>
        <li>@emotion/core: ^10.0.35</li>
        <li>@emotion/styled: ^10.0.27</li>
        <li>axios: ^0.20.0</li>
        <li>emotion-theming: ^10.0.27</li>
        <li>next: 9.5.3</li>
        <li>react: 16.13.1</li>
        <li>react-dom: 16.13.1</li>
        <li>@types/axios: ^0.14.0</li>
        <li>@types/node: ^14.11.1</li>
        <li>@types/react: ^16.9.49</li>
        <li>husky: ^4.3.0</li>
        <li>typescript: ^4.0.2</li>
      </ul>
    </Box>
  );
}
