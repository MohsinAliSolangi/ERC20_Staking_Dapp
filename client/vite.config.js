import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.REACT_APP_RPC': JSON.stringify(env.REACT_APP_RPC),
            'process.env.CHAIN_ID': JSON.stringify(env.CHAIN_ID),
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
    };
});


