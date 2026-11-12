import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Next 16.3+ writes a managed block into AGENTS.md when `next dev` detects
  // an AI coding agent. This repo opts out.
  agentRules: false,
};

export default withMDX(config);
