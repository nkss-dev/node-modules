{
  description = "Dev environment for this project";

  inputs = {
    nextjs-env.url = "https://flakehub.com/f/GetPsyched/nextjs-env/0.x.x.tar.gz";
    nextjs-env.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs@{ nixpkgs, nextjs-env, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      nextjs-env-pkgs = nextjs-env.outputs.packages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with nextjs-env-pkgs; [ default vscode ];
      };
    };
}
