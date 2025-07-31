
import {
  MdDataArray,
  MdOutlineFunctions,
  MdManageSearch,
} from "react-icons/md";
import {
  FaProjectDiagram,
  FaSitemap,
  FaStackOverflow,
  FaMountain,
} from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import { GiTreeBranch } from "react-icons/gi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { BiChip } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineFontSize } from "react-icons/ai";
import { CgRepeat } from "react-icons/cg";
import { HiOutlineHashtag } from "react-icons/hi";

import CustomHeading from "../Custom/CustomHeading";
import CustomLink from "../Custom/CustomLink";
import TiltTorchCard from "../Common/TiltTorchCard";

const ICON_SIZE = 28;
const topics = [
  { name: "Arrays", icon: <MdDataArray size={ICON_SIZE} /> },
  { name: "Strings", icon: <AiOutlineFontSize size={ICON_SIZE} /> },
  { name: "Linked List", icon: <BsLink45Deg size={ICON_SIZE} /> },
  { name: "Stack", icon: <FaStackOverflow size={ICON_SIZE} /> },
  { name: "Queue", icon: <HiOutlineQueueList size={ICON_SIZE} /> },
  { name: "Hashing", icon: <HiOutlineHashtag size={ICON_SIZE} /> },
  { name: "Trees", icon: <GiTreeBranch size={ICON_SIZE} /> },
  { name: "Graphs", icon: <FaProjectDiagram size={ICON_SIZE} /> },
  { name: "Recursion", icon: <CgRepeat size={ICON_SIZE} /> },
  { name: "Dynamic Programming", icon: <MdOutlineFunctions size={ICON_SIZE} /> },
  { name: "Greedy", icon: <SiGoogletagmanager size={ICON_SIZE} /> },
  { name: "Heap", icon: <FaMountain size={ICON_SIZE} /> },
  { name: "Trie", icon: <FaSitemap size={ICON_SIZE} /> },
  { name: "Sorting & Searching", icon: <MdManageSearch size={ICON_SIZE} /> },
  { name: "Bit Manipulation", icon: <BiChip size={ICON_SIZE} /> },
];


const TopicsSection = () => {
  return (
    <section className="py-4 md:py-12 mt-14 px-6 hover:bg-white hover:dark:bg-primary transition-all">
      <div className="w-full md:max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Left Side */}
        <div className="md:w-1/3">
          <CustomHeading>Explore by Topics</CustomHeading>
          <p className="mt-4 text-secondary dark:text-dime">
            Choose a topic to explore problems and sharpen your skills.
          </p>
        </div>

        {/* Scrollable Grid (Right Side) */}
        <div className="md:w-2/3 h-[500px] overflow-y-auto p-2 custom-scroll">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map(({ name, icon }) => (
              <TiltTorchCard
                key={name}
                className="bg-white dark:bg-primary text-center transition-colors duration-300"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-secondary dark:text-accent">{icon}</div>
                  <CustomLink
                    to={`/topics/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-lg font-semibold dark:text-white"
                  >
                    {name}
                  </CustomLink>
                </div>
              </TiltTorchCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
