const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe("Block", () => {
  const timestamp = "a-date";
  const lastHash = "foo-lasthash";
  const hash = "foo-hash";
  const data = ["blockchain", "data"];
  const block = new Block({
    timestamp,
    hash,
    lastHash,
    data,
  });

  it('should has timestamp, hash, lastHash and data property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.data).toEqual(data);
  })

  describe("genenis()", () => {
    const genenisBlock = Block.genesis();
    it('should returns a block instance', () => {
        expect(genenisBlock instanceof Block).toBe(true);
    })
    it('should returns the genesis data', () => {
        expect(genenisBlock).toEqual(GENESIS_DATA);
    })
  });
  
  describe('minedBlock', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data })

    it('should returns a Block instance', () => {
        expect(minedBlock instanceof Block).toBe(true);
    })

    it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
        expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
        expect(minedBlock.data).toEqual(data);
    })

    it('sets a timestamp', () => {
        expect(minedBlock.timestamp).not.toEqual(undefined);
    })

    it('creates a SHA-256 `hash` based on the proper inputs', () => {
        expect(minedBlock.hash).toEqual(
          cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
        );
    })
  })
});

