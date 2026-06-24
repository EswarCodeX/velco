// Workaround for BSON >= 6.10.x throwing ERR_NOT_IMPLEMENTED in Bun
if (globalThis.process && typeof (globalThis.process as any).getBuiltinModule === "function") {
  const originalGetBuiltinModule = (globalThis.process as any).getBuiltinModule.bind(globalThis.process);
  (globalThis.process as any).getBuiltinModule = (name: string) => {
    if (name === "v8") {
      const originalV8 = originalGetBuiltinModule("v8") || {};
      return {
        ...originalV8,
        startupSnapshot: { isBuildingSnapshot: () => false },
      };
    }
    return originalGetBuiltinModule(name);
  };
}
