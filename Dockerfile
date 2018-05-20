# Build container
FROM elixir:1.5 as builder

COPY ssh-id_rsa_github /root/.ssh/id_rsa_github
COPY ssh-config /root/.ssh/config

WORKDIR /exred

ENV MIX_ENV=prod

COPY mix.exs mix.lock ./
COPY config config
COPY apps apps
COPY certs certs
COPY ui/dist ui/dist
COPY rel rel

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix do deps.get, deps.compile

RUN MIX_ENV=prod mix phx.digest
RUN MIX_ENV=prod mix compile
RUN mix release --env=prod --verbose




FROM elixir:1.5

ARG VERSION=1

EXPOSE 4000

ENV PORT=4000 \
    MIX_ENV=prod \
    REPLACE_OS_VARS=true \
    SHELL=/bin/bash

WORKDIR /app

COPY --from=builder /exred/_build/prod/rel/exred/releases/${VERSION}/exred.tar.gz .

RUN tar zxf exred.tar.gz && rm exred.tar.gz

RUN chown -R root ./releases

USER root

CMD ["/app/bin/exred", "foreground"]
