import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, Role, SubmissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const salt = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@review.dev";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin-Pass-2026";
  const adminName = process.env.ADMIN_NAME ?? "Ada Mentor";

  const adminHash = await bcrypt.hash(adminPassword, salt);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: Role.ADMIN, name: adminName, passwordHash: adminHash },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash: adminHash,
      role: Role.ADMIN,
    },
  });

  const studentHash = await bcrypt.hash("Student-Pass-2026", salt);
  const students = [
    { email: "student@review.dev", name: "Leo Chen" },
    { email: "mira@review.dev", name: "Mira Okonkwo" },
    { email: "sam@review.dev", name: "Sam Patel" },
  ];

  const createdStudents = [];
  for (const s of students) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: { name: s.name, passwordHash: studentHash, role: Role.STUDENT },
      create: {
        email: s.email,
        name: s.name,
        passwordHash: studentHash,
        role: Role.STUDENT,
      },
    });
    createdStudents.push(user);
  }

  const [leo, mira, sam] = createdStudents;
  if (!leo || !mira || !sam) return;

  const samples = [
    {
      id: "seed_harbor_notes",
      projectName: "Harbor Notes",
      repoUrl: "https://github.com/leo-chen/harbor-notes",
      repoKey: "github.com/leo-chen/harbor-notes",
      liveUrl: "https://harbor-notes.example.com",
      description:
        "A quiet notebook for studio critiques with pinned references and margin notes.",
      status: SubmissionStatus.PENDING,
      studentId: leo.id,
      reviewerId: null as string | null,
      reviewFeedback: null as string | null,
      reviewedAt: null as Date | null,
    },
    {
      id: "seed_campus_map",
      projectName: "Campus Map",
      repoUrl: "https://github.com/leo-chen/campus-map",
      repoKey: "github.com/leo-chen/campus-map",
      liveUrl: "https://campus-map.example.com",
      description:
        "Accessible campus wayfinding with keyboard routes and a live evening shuttle layer.",
      status: SubmissionStatus.APPROVED,
      studentId: leo.id,
      reviewerId: admin.id,
      reviewFeedback: "Clear scope and a working demo. Approved for the showcase.",
      reviewedAt: new Date("2026-03-04T18:30:00.000Z"),
    },
    {
      id: "seed_night_market",
      projectName: "Night Market",
      repoUrl: "https://github.com/mira-o/night-market",
      repoKey: "github.com/mira-o/night-market",
      liveUrl: "https://night-market.example.com",
      description:
        "Vendor directory for a student night market with stall maps and hours.",
      status: SubmissionStatus.REJECTED,
      studentId: mira.id,
      reviewerId: admin.id,
      reviewFeedback:
        "The repository is missing a README and the live demo returns a 404. Add setup steps and a reachable demo.",
      reviewedAt: new Date("2026-02-22T16:10:00.000Z"),
    },
    {
      id: "seed_atlas_kit",
      projectName: "Atlas Kit",
      repoUrl: "https://github.com/mira-o/atlas-kit",
      repoKey: "github.com/mira-o/atlas-kit",
      liveUrl: "https://atlas-kit.example.com",
      description:
        "Component kit for field-research maps with layer toggles and offline tiles.",
      status: SubmissionStatus.PENDING,
      studentId: mira.id,
      reviewerId: null,
      reviewFeedback: null,
      reviewedAt: null,
    },
    {
      id: "seed_quiet_queue",
      projectName: "Quiet Queue",
      repoUrl: "https://github.com/sam-patel/quiet-queue",
      repoKey: "github.com/sam-patel/quiet-queue",
      liveUrl: "https://quiet-queue.example.com",
      description:
        "Office-hour queue that hides names until a mentor is ready, with estimated wait.",
      status: SubmissionStatus.APPROVED,
      studentId: sam.id,
      reviewerId: admin.id,
      reviewFeedback: "Solid privacy model and a demo that works without local setup.",
      reviewedAt: new Date("2026-03-09T14:05:00.000Z"),
    },
    {
      id: "seed_field_notes",
      projectName: "Field Notes",
      repoUrl: "https://github.com/sam-patel/field-notes",
      repoKey: "github.com/sam-patel/field-notes",
      liveUrl: "https://field-notes.example.com",
      description:
        "Offline-first notes for site visits with photo captions and markdown export.",
      status: SubmissionStatus.PENDING,
      studentId: sam.id,
      reviewerId: null,
      reviewFeedback: null,
      reviewedAt: null,
    },
  ];

  for (const sample of samples) {
    await prisma.submission.upsert({
      where: { id: sample.id },
      update: {},
      create: sample,
    });
  }

  console.log("Seed complete");
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
  console.log("Students: student@review.dev, mira@review.dev, sam@review.dev / Student-Pass-2026");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
