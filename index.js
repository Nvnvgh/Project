#!/usr/bin/env node

'use strict';

const crypto = require('crypto');

const DEFAULT_LENGTH = 8;
const MIN_LENGTH = 1;
const MAX_LENGTH = 4096;

const ALPHABET = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  '!@#$%^&*()_+-=[]{}|;:,.<>/?~`',
].join('');

function printHelp() {
  const script = 'index.js';
  process.stdout.write(
    [
      'Password generator (crypto)',
      '',
      `Usage: ${script} [length]`,
      '',
      'Arguments:',
      '  length   Password length (default: 8)',
      '',
      'Examples:',
      `  ${script}`,
      `  ${script} 16`,
    ].join('\n') + '\n',
  );
}

function parseLengthArg(argv) {
  const arg = argv[2];
  if (arg === undefined) return DEFAULT_LENGTH;
  if (arg === '-h' || arg === '--help') return null;

  if (!/^\d+$/.test(arg)) {
    throw new Error(`Invalid length: "${arg}". Expected a positive integer.`);
  }

  const n = Number.parseInt(arg, 10);
  if (!Number.isSafeInteger(n) || n < MIN_LENGTH || n > MAX_LENGTH) {
    throw new Error(`Invalid length: ${arg}. Allowed range: ${MIN_LENGTH}..${MAX_LENGTH}.`);
  }

  return n;
}

function generatePassword(length) {
  let out = '';
  for (let i = 0; i < length; i++) {
    const idx = crypto.randomInt(0, ALPHABET.length);
    out += ALPHABET[idx];
  }
  return out;
}

try {
  const length = parseLengthArg(process.argv);
  if (length === null) {
    printHelp();
    process.exitCode = 0;
  } else {
    process.stdout.write(generatePassword(length) + '\n');
  }
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  process.stderr.write(msg + '\n');
  process.stderr.write('Use --help to see usage.\n');
  process.exitCode = 2;
}

