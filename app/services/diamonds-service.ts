interface ScoreMap {
  codewars: { [key: number]: number };
}

class DiamondsService {
  static scoreMap: ScoreMap = {
    // Map reference for diamond rewards for each solved challenge
    codewars: {
      /* 
    Number of diamonds according to its kyo (8 = 8kyo)
      Scores:
        8kyo = 5💎
        7kyo = 10💎
        6kyo = 25💎
        5kyo = 50💎
        4kyo = 100💎
        3kyo = 200💎
        2kyo = 300💎
        1kyo = 500💎
    */
      1: 500,
      2: 300,
      3: 200,
      4: 100,
      5: 50,
      6: 25,
      7: 10,
      8: 5,
    },
  };
}

export default DiamondsService;
