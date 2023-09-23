"use client";

import { fetcher } from "../../../../utils/fetcher";

export default async function ClubPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  // const data1: Array<clubMember> = await fetcher(`/clubs/${name}/members`);
  const data: Array<ClubMember> = [
    {
      roll_number: "12012109",
      name: "Mohit Mahipal",
      section: "CS-A3",
      batch: 2024,
      email: "mohit95876@gmail.com",
      position: "memeber",
    },
    {
      roll_number: "12022005",
      name: "Priyanshu Tripathi",
      section: "CS-B5",
      batch: 2024,
      email: "priyanshu@gmail.com",
      position: "memeber",
    },
  ];
  let isMobile: boolean = false;
  return (
    <>
      <table className="border-2 w-full">
        <thead>
          {isMobile ? (
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
            </tr>
          ) : (
            <>
              <tr>
                <th>Roll Number</th>
                <th>Section</th>
                <th>Name</th>
                <th>Batch</th>
                <th>Email</th>
                <th>Position</th>
              </tr>
            </>
          )}
        </thead>

        <tbody>
          {data.map((person: ClubMember) => {
            return (
              <tr>
                <td>{person.roll_number}</td>
                <td>{person.section}</td>
                <td>{person.name}</td>
                <td>{person.batch}</td>
                <td>{person.email}</td>
                <td>{person.position}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot></tfoot>
      </table>
    </>
  );
}
