import Head from "next/head";
import ApplicationLogo from "../components/UI/ApplicationLogo";
import FeedbacksListHeader from "../components/FeedbacksListHeader";
import FeedbacksList from "../components/FeedbacksList";
import RoadmapMenu from "../components/RoadmapMenu";
import TagsCloud from "../components/TagsCloud";

const FEEDBACKS = [
  {
    id: "1",
    title: "Add tags for solutions",
    description: "Easier to search for solutions based on specific task.",
    slug: "add-tags-for-solution-01",
    tag: { name: "Enhancement", slug: "enhancement" },
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    comments: 2,
    upvotes: 112,
  },
  {
    id: "2",
    title: "Add a dark theme option",
    description:
      "It would help people with light sensitivities and who prefer dark mode.",
    slug: "add-a-dark-theme-option-02",
    tag: { name: "Feature", slug: "feature" },
    createdAt: "2022-03-01T00:00:00.000Z",
    updatedAt: "2022-03-01T00:00:00.000Z",
    comments: 4,
    upvotes: 99,
  },
  {
    id: "3",
    title: "Q&A within the challenge hubs",
    description: "Challenge-specific Q&A would make for easy reference.",
    slug: "qa-withing-the-challenge-hubs-03",
    tag: { name: "Feature", slug: "feature" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 1,
    upvotes: 65,
  },
  {
    id: "4",
    title: "Allow image/video upload to feedback",
    description: "Images and screencasts can enhance comments on solutions..",
    slug: "allow-image-video-upload-to-feedback-04",
    tag: { name: "Enhancement", slug: "enhancement" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 2,
    upvotes: 51,
  },
  {
    id: "5",
    title: "Ability to follow others",
    description: "Stay updated on comments and solutions other people post.",
    slug: "ability-to-follow-others-05",
    tag: { name: "Feature", slug: "feature" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 3,
    upvotes: 42,
  },
  {
    id: "6",
    title: "Preview images not loading",
    description:
      "Challenge preview images are missing when you apply a filter.",
    slug: "preview-images-not-loading-06",
    tag: { name: "Bug", slug: "bug" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 0,
    upvotes: 3,
  },
];

const TAGS = [
  { name: "Enhancement", slug: "enchancement" },
  { name: "Feature", slug: "feature" },
  { name: "Bug", slug: "bug" },
  { name: "UI", slug: "ui" },
  { name: "UX", slug: "ux" },
  { name: "Documentation", slug: "documentation" },
];

const feedbackStatuses = [
  { name: "Planned", count: 2, color: "#F49F85" },
  { name: "In-Progress", count: 3, color: "#AD1FEA" },
  { name: "Live", count: 1, color: "#62BCFA" },
];

export default function Suggestions() {
  return (
    <div className="flex min-h-screen py-2 container mx-auto gap-7">
      <Head>
        <title>Feedback App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex flex-col gap-6 max-w-xs">
        <ApplicationLogo />
        <TagsCloud tags={TAGS} />
        <RoadmapMenu feedbackStatuses={feedbackStatuses} />
      </nav>
      <main className="flex flex-col w-full gap-7">
        <FeedbacksListHeader feedbackCount={FEEDBACKS.length} />
        <FeedbacksList feedbacks={FEEDBACKS} userUpvotedFeedbacksIds={[]} />
      </main>
    </div>
  );
}
