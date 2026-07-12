import {
  LayoutDashboard, Gavel, Armchair, BookOpen, Wallet, Siren, SearchCheck,
} from "lucide-react";

/* Secret class roll-number roster — the authentication baseline. */
export const VALID_ROLLS = {
  "01": "Biltu", "02": "Miltu", "03": "Rafi", "04": "Arif", "05": "Sadia",
  "06": "Tanvir", "07": "Nabila", "08": "Farhan", "09": "Mim", "10": "Shuvo",
  "11": "Priya", "12": "Rakib", "13": "Anika", "14": "Sourav", "15": "Tania",
  "16": "Emon", "17": "Ruma", "18": "Nayeem", "19": "Lamia", "20": "Zihad",
};

/* Official rulebook — used verbatim by the Fact Checker. Kuddus's
   fabrications are marked false; Rashid Sir's actual directives are true. */
export const RULE_DB = [
  {
    q: "captain must consult 2nd and 3rd captain",
    verdict: true,
    rule: "Rashid Sir's Directive, on handover of the Captaincy",
    explain: "Confirmed. The 1st Captain must consult the 2nd and 3rd Captains before major decisions — Kuddus has ignored this since day one.",
  },
  {
    q: "three anonymous complaints impeachment",
    verdict: true,
    rule: "School Rulebook — the Impeachment Clause",
    explain: "Confirmed. Two warnings, then a third verified anonymous strike triggers immediate impeachment proceedings.",
  },
  {
    q: "captains cannot file complaints against other captains",
    verdict: true,
    rule: "School Rulebook, Captaincy Conduct",
    explain: "Confirmed. This is exactly why Biltu and Miltu need the general students to file strikes on their behalf.",
  },
  {
    q: "20 percent quality control tax on tiffin",
    verdict: false,
    rule: "No matching clause in the official rulebook",
    explain: "Fabricated. There is no tax authority granted to any Captain over classmates' lunches. This is a Kuddus original.",
  },
  {
    q: "2 taka washroom toll class welfare fund",
    verdict: false,
    rule: "No matching clause in the official rulebook",
    explain: "Fabricated. No \"Class Welfare Fund\" toll exists. Washroom access during free periods is unrestricted.",
  },
  {
    q: "tallest boys must sit in the front row",
    verdict: false,
    rule: "Seating Policy, Section 1",
    explain: "False. Seating is meant to preserve sightlines to the whole class, not to block the teacher's view of any one desk.",
  },
  {
    q: "captain has veto power to cancel pt",
    verdict: false,
    rule: "No matching clause in the official rulebook",
    explain: "Fabricated. No Captain holds veto power over PT period activities.",
  },
  {
    q: "test syllabus includes writer biography and index",
    verdict: false,
    rule: "No matching clause in the official rulebook",
    explain: "False. Examinable content is set by Rashid Sir's curriculum, not by the Captain, and never includes the index or back-cover barcode.",
  },
  {
    q: "headmaster said 1st captains dont have to do homework",
    verdict: false,
    rule: "No matching clause in the official rulebook",
    explain: "Fabricated. No such exemption has ever been issued by the Headmaster's office.",
  },
];

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "strike", label: "Strike Portal", icon: Gavel },
  { id: "seating", label: "Seating", icon: Armchair },
  { id: "syllabus", label: "Syllabus Digest", icon: BookOpen },
  { id: "ledger", label: "Digital Ledger", icon: Wallet },
  { id: "sos", label: "SOS Alert", icon: Siren },
  { id: "fact", label: "Fact Checker", icon: SearchCheck },
];

export const FEATURES = [
  { id: "strike", title: "Strike Portal", desc: "File an anonymous report against Kuddus.", icon: Gavel },
  { id: "seating", title: "Seating", desc: "Sort desks shortest to tallest, front row first.", icon: Armchair },
  { id: "syllabus", title: "Syllabus Digest", desc: "Compress the syllabus bloat into bullets.", icon: BookOpen },
  { id: "ledger", title: "Digital Ledger", desc: "Tiffin theft and washroom toll, tracked.", icon: Wallet },
  { id: "sos", title: "SOS Alert", desc: "Ping the resistance when Kuddus is near.", icon: Siren },
  { id: "fact", title: "Fact Checker", desc: "Verify Kuddus's \"official\" decrees.", icon: SearchCheck },
];
