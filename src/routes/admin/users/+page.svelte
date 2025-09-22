<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { enhance } from "$app/forms";
    
    let { form } = $props();

</script>

<div class="size-full p-8 flex justify-center items-start">
    <Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>User Creation</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/register" use:enhance>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input name="username" autocomplete="off" required />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input name="password" type="password" required />
					</div>
					<div class="grid gap-2">
						<Label for="confirmPassword">Confirm Password</Label>
						<Input name="confirmPassword" type="password" required />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full ">Create</Button>
		</Card.Footer>
	</Card.Root>
</div>