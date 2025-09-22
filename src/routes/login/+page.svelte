<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
</script>

<header class="fixed w-full h-12 px-4 flex items-center border shadow">
    <h1 class="text-base font-medium">BeachBus</h1>
</header>
<main class="size-full pt-20 px-8 pb-8 flex justify-center items-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Login</Card.Title>
		</Card.Header>
		<Card.Content>
			<form id="login" method="POST" action="?/login">
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input name="username" autocomplete="off" required />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input name="password" type="password" required />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button form="login" type="submit" class="w-full ">Login</Button>
		</Card.Footer>
	</Card.Root>
</main>