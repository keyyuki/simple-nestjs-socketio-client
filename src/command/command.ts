export class Command {
  id: string;
  resolve: CallableFunction;
  reject: CallableFunction;
  promise: Promise<unknown>;
}

export function commandFactory(): Command {
  const command = new Command();
  command.id = `${Date.now().toString()}-${Math.round(
    Math.random() * 1000,
  ).toString()}`;

  command.promise = new Promise((resolve, reject) => {
    command.resolve = resolve;
    command.reject = reject;
  });

  return command;
}
