import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <Heading
          level="h2"
          className="txt-xlarge font-bold text-[#f8fafc]"
        >
          Already have an account?
        </Heading>
        <Text className="txt-medium text-[#94a3b8] mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10 bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-vault-neon hover:text-vault-neon hover:shadow-[0_0_16px_rgba(0,210,255,0.25)]"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
