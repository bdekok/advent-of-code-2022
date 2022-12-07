import { assertEquals } from '../depts.ts';
import { getTotalDirectorySize } from './getDirectorySize.ts';

const testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

// - / (dir)
//   - a (dir)
//     - e (dir)
//       - i (file, size=584)
//         -j (file, size=100)
//     - f (file, size=29116)
//     - g (file, size=2557)
//     - h.lst (file, size=62596)
//   - b.txt (file, size=14848514)
//   - c.dat (file, size=8504156)
//   - d (dir)
//     - j (file, size=4060174)
//     - d.log (file, size=8033020)
//     - d.ext (file, size=5626152)
//     - k (file, size=7214296)
const testDataThreeDeep = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd i
100 j
$ cd ..
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

// /                              8504156 + 14848514+ 94953 + 24933642 = 48.381.265
//     14848514 b.txt
//     8504156 c.dat
//     /a                          94269+ 584 + 100 =94953 
//         29116 f
//         2557 g
//         62596 h.lst
//         /e                      584 + 100= 684
//             584 i
//             /i                  100
//                 100 j
//     /d                          24933642
//         4060174 j
//         8033020 d.log
//         5626152 d.ext
//         7214296 k



Deno.test('Exercise one on day 7 gets the size of a directory of max 10000', () => {
  assertEquals(getTotalDirectorySize(testData), 95437);
  assertEquals(getTotalDirectorySize(testDataThreeDeep), 94953 + 584 + 100 + 100); 



});

Deno.test('Exercise one on day five gets the start of the string', () => {
  // assertEquals(getDirectorySize(testData), 19);
});

// Deno.test('Exercise one on day five gets crates non reversed', () => {
//   assertEquals(getFirstOfCratesNonReversed(testData), 'MCD');
// });
