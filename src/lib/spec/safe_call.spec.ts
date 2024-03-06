import Lib from "..";

describe("Lib.safe_call", () => {
  const get_data = async (
    data: any,
    message: string,
    shouldFail: boolean = false
  ): Promise<{ data: any; message: string }> =>
    await new Promise((resolve, reject): void => {
      if (shouldFail) reject(new Error("fail"));
      setTimeout(
        () =>
          resolve({
            data,
            message,
          }),
        100
      );
    });

  test("should return data on success", async () => {
    const [data, _] = await Lib.safe_call(get_data, [
      { einsame: "blumen" },
      "schumann",
    ]);

    expect(data?.data?.einsame).toBe("blumen");
    expect(data?.message).toBe("schumann");
  });

  test("should return error on fail", async () => {
    const [_, err] = await Lib.safe_call(get_data, [
      { einsame: "blumen" },
      "schumann",
      true,
    ]);

    expect(err?.message).toBe("fail");
  });
});
