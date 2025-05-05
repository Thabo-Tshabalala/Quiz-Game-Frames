import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const idString: string | null = searchParams.get("id")
  const id = parseInt(idString ?? "0");
  const nextId = id + 1
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;

  const answerOptions = [
    ["USDT", "cUSD", "DAI"],
    ["Ethereum", "Polkadot", "Solana"],
    ["CELO", "ETH", "BTC"],
  ];
  
  const correctAnswers = [1, 0, 0];

  // Check if the answer is correct
  if (id > 1 && buttonId - 1 !== correctAnswers[id - 2]) {
    return new NextResponse(`<!DOCTYPE html><html><head>
      <title>Wrong! Try again.</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://ipfs.io/ipfs/bafkreiggfmklyvcevvpnw2exxqktupxeyqniha2euyugt6terismodrsry" />  
      <meta property="fc:frame:button:1" content="Play again" />
      <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/end" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    </head></html>`);
  }

  // If it's the last question (id == 4), show the win screen
  if (id === 4) {
    return new NextResponse(`<!DOCTYPE html><html><head>
      <title>You won!</title>
      <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/bafkreigjugu4uqecc7fqrt4zzu6qzrbvafnk5hl4iaqjcu6ekrdab2bkqy" />
      <meta property="fc:frame:button:1" content="Play again" />
      <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/end" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    </head></html>`);
  } else {
    // Generate the response for the current quiz frame
    return new NextResponse(`<!DOCTYPE html><html><head>
      <title>This is frame ${id}</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/bafybeihnkefkt6qtipbbyywcyxns2g23fxgxztdwrgegph4z6bddf5j5be/${id}.png" />
      <meta property="fc:frame:button:1" content="${answerOptions[id - 1][0]}" />
      <meta property="fc:frame:button:2" content="${answerOptions[id - 1][1]}" />
      <meta property="fc:frame:button:3" content="${answerOptions[id - 1][2]}" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
      <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${nextId}" />
    </head></html>`);
  }

}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';